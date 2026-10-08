// Server Component: it can be `async` and `await` data directly.
// NOTE: do NOT add 'use client' here — Client Components cannot be async.

// Simulates GET http://localhost:5000/products from the Flask API.
// In a real Server Component you write:
//   const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/products');
//   const products = await res.json();
function fetchProducts(): Promise<Product[]> {
    const DATA: Product[] = [
        { id: 42, name: 'Laptop Stand', price: 250000, inStock: true, category: 'Accessories' },
        { id: 7, name: 'Keyboard', price: 450000, inStock: false, category: 'Accessories' },
        { id: 9, name: 'USB-C Hub', price: 320000, inStock: true, category: 'Accessories' },
    ];
    return new Promise(
        (resolve) => setTimeout(() => 
            resolve(DATA), 400
            )
    );
}

function formatPrice(n: number) {
    return 'Rp ' + n.toLocaleString('id-ID');
}

interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
    category: string
}

interface ProductApi {
    id: number;
    image: string;
    name: string;
    price: number;
    slug: string;
    stock: number;
}

interface ProductsResponse {
    data: ProductApi[];
    message: string;
    status: boolean;
}

function ProductCard({ product }: { product: ProductApi}) {
    return (
        <div className="border rounded-lg p-4">
            <div className="bg-gray-100 h-24 flex items-center justify-center text-gray-400 rounded mb-3">
                img
            </div>
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-gray-600">{formatPrice(product.price)}</p>
            {
                product.stock > 0 ? (
                    <span className="inline-block mt-2 text-xs px-2 py-1 rounded bg-green-100 text-green-700">In stock</span>
                ) : (
                    <span className="inline-block mt-2 text-xs px-2 py-1 rounded bg-red-100 text-red-700">Out of stock</span>
                )
            }
        </div>
    );
}

export default async function HandsOn1() {
    // const [products, setProducts] = useState<Product[]>([]);

    // useEffect(() => {
    //     fetchProducts().then((data) => setProducts(data));
    // }, []);

    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${base}api/v1/products/`);
    const json: ProductsResponse = await response.json();
    const products = json.data;


    return (
        <main className="font-sans p-6">
            <p className="text-sm text-gray-500 mb-3">RevoShop &rsaquo; Products</p>
            <div className="grid grid-cols-3 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product}></ProductCard>
                ))}
            </div>
        </main>
    );
}