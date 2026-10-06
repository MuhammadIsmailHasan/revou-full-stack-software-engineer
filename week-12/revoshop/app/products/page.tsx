const ROUTES = [
    { url: '/',           label: 'Home' },
    { url: '/products',   label: 'Active' },
    { url: '/categories', label: 'Page' },
    { url: '/orders',     label: 'Page' },
];


export default function ProductPage() {
    return (
        <main className="p-8 font-sans">
        <h1 className="text-2xl font-bold mb-1">RevoShop Products </h1>
        <p className="text-gray-500 mb-6">Each card is one page.tsx file</p>
        <div className="grid gap-3">
            {ROUTES.map((r) => (
            <div key={r.url} className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold">{r.label}</h2>
                <p className="text-blue-600 font-mono text-sm">{r.url}</p>
            </div>
            ))}
        </div>
        </main>
    )
}