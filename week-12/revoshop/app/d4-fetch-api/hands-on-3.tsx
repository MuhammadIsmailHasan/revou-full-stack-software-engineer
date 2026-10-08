'use client'
import { useState, useEffect } from 'react';

// Cetakan satu produk.
interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
}

// Meniru bentuk objek Response dari fetch(). Perhatikan: json adalah FUNGSI
// yang mengembalikan Promise, bukan properti biasa. Makanya ditulis () => Promise<...>.
interface ProductsResponse {
    ok: boolean;
    status: number;
    json: () => Promise<Product[] | null>;
}

// Simulates fetch(): when the "server" fails, ok is false and status is 500.
// Hasilnya datang lewat setTimeout, jadi dibungkus Promise<ProductsResponse>.
function mockFetch(shouldFail: boolean): Promise<ProductsResponse> {
    return new Promise((resolve) =>
        setTimeout(() => {
        if (shouldFail) {
            resolve({ ok: false, status: 500, json: () => Promise.resolve(null) });
        } else {
            resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve([
                    { id: 42, name: 'Laptop Stand', price: 250000, inStock: true },
                    { id: 7,  name: 'Keyboard',     price: 450000, inStock: false },
                ]),
            });
        }
        }, 600)
    );
}

// LAYER 1: check res.ok and throw a descriptive, typed error on failure.
async function getProducts(shouldFail: boolean): Promise<Product[]> {
    const res = await mockFetch(shouldFail);
    // TODO Step 2: if the response is not ok, throw new Error with a message that
    if (!res.ok) {
        throw new Error('Failed to load products (' + res.status + ')');
    }

    // Setelah lolos cek di atas, data pasti ada (bukan null).
    const data = await res.json();
    return data ?? [];
}

export default function HandsOn3() {
    const [shouldFail, setShouldFail] = useState(false);
    const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
    const [products, setProducts] = useState<Product[]>([]);
    const [message, setMessage] = useState('');
    // Dinaikkan setiap kali kita ingin memuat ulang (tombol "Try again").
    const [reloadKey, setReloadKey] = useState(0);

    // Effect ini HANYA mengambil data. Pemanggilan setState terjadi di dalam
    // callback async (.then / .catch) — itu TIDAK sinkron, jadi aman dari aturan lint.
    useEffect(() => {
        let aktif = true; // mencegah update kalau effect sudah "dibersihkan"
        getProducts(shouldFail)
            .then((data) => {
                if (!aktif) return;
                setProducts(data);
                setStatus('success');
            })
            .catch((err) => {
                if (!aktif) return;
                setMessage(err.message);
                setStatus('error');
            });
        return () => { aktif = false; };
    }, [shouldFail, reloadKey]);

    // Dipanggil dari tombol "Try again" (event handler — setState di sini selalu boleh).
    function retry() {
        setStatus('loading');
        setReloadKey((k) => k + 1);
    }

    return (
        <main className="font-sans p-6">
            <label className="flex items-center gap-2 mb-4 text-sm">
                <input type="checkbox" checked={shouldFail} onChange={(e) => { setStatus('loading'); setShouldFail(e.target.checked); }} />
                Simulate server failure (500)
            </label>

            {/* LAYER 3: loading.tsx — skeleton while fetching */}
            {status === 'loading' && (
                <div>
                    <p className="text-indigo-600 font-medium mb-3">Fetching products…</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-28 bg-gray-200 rounded animate-pulse" />
                        <div className="h-28 bg-gray-200 rounded animate-pulse" />
                    </div>
                </div>
            )}

            {/* LAYER 2: error.tsx — friendly UI + Try again */}
            {status === 'error' && (
                <div className="border border-red-200 bg-red-50 rounded-lg p-6 text-center">
                    <p className="font-semibold text-red-700">Something went wrong</p>
                    <p className="text-sm text-red-600 mt-1">Unable to load products. Please try again.</p>
                    <p className="text-xs text-gray-400 mt-1 font-mono">{message}</p>
                    <button onClick={retry} className="mt-3 px-4 py-2 bg-gray-800 text-white rounded text-sm">Try again</button>
                </div>
            )}

            {status === 'success' && (
                <div className="grid grid-cols-2 gap-4">
                    {products.map((p) => (
                        <div key={p.id} className="border rounded-lg p-4">
                        <h3 className="font-semibold">{p.name}</h3>
                        <p className="text-gray-600">Rp {p.price.toLocaleString('id-ID')}</p>
                        </div>
                    ))}
                </div>
            )}
            </main>
    );
}