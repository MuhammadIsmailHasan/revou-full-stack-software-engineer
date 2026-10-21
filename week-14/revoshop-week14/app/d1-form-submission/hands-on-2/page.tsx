'use client'

import { useState } from 'react';

// --- Simulated ProtectedRoute (the real one redirects to /login when not authed) ---
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const isAuthed = true; // pretend "John" is logged in
    if (!isAuthed) return <p className="p-6">Redirecting to /login…</p>;
    return children;
}

// --- Simulated useCart() (the real one comes from a CartContext provider) ---
function useCart() {
    const [items, setItems] = useState([
        { id: 1, name: 'Laptop Stand', price: 250000, quantity: 1 },
        { id: 2, name: 'Mouse', price: 150000, quantity: 2 },
    ]);
    function removeFromCart(productId: number) {
        setItems((prev) => prev.filter((it) => it.id !== productId));
    }
    return { items, removeFromCart };
}

function formatPrice(n: number) : string {
    return 'Rp ' + n.toLocaleString('id-ID');
}

function CartPage() {
    const { items, removeFromCart } = useCart();

    const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

    return (
        <main className="font-sans p-6 max-w-2xl">
            <header className="flex items-center gap-4 border-b pb-3 mb-4">
                <span className="font-bold text-lg">RevoShop</span>
                <span className="text-gray-500 text-sm">Products</span>
                <span className="text-gray-500 text-sm">John</span>
                <span className="ml-auto text-sm">Cart ({items.length})</span>
            </header>

            <h1 className="text-xl font-semibold mb-3">My cart</h1>

            {items.length === 0 ? (
                <div className="p-4 bg-amber-200 text-xs text-black rounded">
                    Your cart is empty.
                </div>
            ) : (
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-500 border-b">
                            <th className="py-2">Product</th>
                            <th className="py-2">Price</th>
                            <th className="py-2">Subtotal</th>
                            <th className="py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="my-2 align-middle">
                                <td>{item.name}</td>
                                <td>{formatPrice(item.price)}</td>
                                <td>{formatPrice(item.price * item.quantity)}</td>
                                <td className="text-right">
                                    <button
                                        type="button"
                                        className="text-red-600 hover:text-red-800"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div className="flex justify-between items-center mt-4 pt-3 border-t">
                <span className="text-gray-500">Total</span>
                <span className="font-bold text-lg">{formatPrice(total)}</span>
            </div>

            <button
                disabled={items.length === 0}
                className="w-full mt-4 px-4 py-2 bg-gray-900 text-white rounded disabled:opacity-50"
            >
                Proceed to Checkout
            </button>
        </main>
    );
}

export default function App() {
    return (
        <ProtectedRoute>
            <CartPage />
        </ProtectedRoute>
    );
}