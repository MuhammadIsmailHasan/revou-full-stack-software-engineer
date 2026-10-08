'use client'
import { useState, useEffect } from 'react';

// "Cetakan" untuk satu produk. Ditulis sekali, dipakai di banyak tempat.
interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  category: string;
}

function fetchProduct(id: string): Promise<Product> {
  const DATA: Record<string, Product> = {
    '42': { id: 42, name: 'Laptop Stand', price: 250000, inStock: true,  category: 'Accessories' },
    '7':  { id: 7,  name: 'Keyboard',     price: 450000, inStock: false, category: 'Accessories' },
    '9':  { id: 9,  name: 'USB-C Hub',    price: 320000, inStock: true,  category: 'Accessories' },
  };
  return new Promise((resolve) => setTimeout(() => resolve(DATA[id]), 300));
}

function formatPrice(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id);
  return { title: `${product.name} — RevoShop` };
}

export default function HandsOn2() {
  const [id, setId] = useState('42');
  const [product, setProduct] = useState<Product | null>(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchProduct(id).then(setProduct);
    generateMetadata({ params: { id } }).then((m) => setTitle(m.title));
  }, [id]);

  return (
    <main className="font-sans p-6 max-w-xl">
      <div className="inline-flex items-center gap-2 bg-gray-100 rounded-t-lg px-3 py-1.5 border">
        <span className="w-3 h-3 rounded-full bg-gray-300" />
        <span className="font-medium text-black">{title}</span>
      </div>

      <div className="flex gap-2 my-3">
        {['42', '7', '9'].map((n) => (
          <button key={n} onClick={() => setId(n)}
            className={n === id ? 'px-3 py-1 rounded bg-indigo-600 text-white text-sm' : 'px-3 py-1 rounded border text-sm'}>
            /products/{n}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500 mb-3">RevoShop &rsaquo; Products &rsaquo; {product ? product.name : '...'}</p>

      {product && (
        <div className="border rounded-lg p-6">
          <div className="bg-gray-100 h-32 flex items-center justify-center text-gray-400 rounded mb-4">img</div>
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-gray-600">{formatPrice(product.price)}</p>
          {
              product.inStock? (
                  <span className="inline-block mt-2 text-xs px-2 py-1 rounded bg-green-100 text-green-700">In stock</span>
              ) : (
                  <span className="inline-block mt-2 text-xs px-2 py-1 rounded bg-red-100 text-red-700">Out of stock</span>
              )
          }
        </div>
      )}
    </main>
  );
}