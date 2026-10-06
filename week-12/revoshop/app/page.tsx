// In a real Next.js app, each route below is a separate page.tsx file.
// Here we render them as a "route map" so you can SEE the folder -> URL mapping.

const ROUTES = [
  { url: '/',           file: 'app/page.tsx',              heading: 'Home',          backend: 'GET /' },
  { url: '/products',   file: 'app/products/page.tsx',     heading: 'Products',      backend: 'GET /products' },
  { url: '/categories', file: 'app/categories/page.tsx',   heading: 'Categories',    backend: 'GET /categories' },
  // TODO Step 3: add the /orders route -> file 'app/orders/page.tsx', heading 'Orders', backend 'GET /orders'
];

export default function RouteMap() {
  return (
    <main className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-1">RevoShop Routes</h1>
      <p className="text-gray-500 mb-6">Each card is one page.tsx file</p>
      <div className="grid gap-3">
        {ROUTES.map((r) => (
          <div key={r.url} className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold">{r.heading}</h2>
            <p className="text-blue-600 font-mono text-sm">{r.url}</p>
            <p className="text-gray-400 font-mono text-xs">{r.file}</p>
            <p className="text-green-600 font-mono text-xs">→ {r.backend}</p>
          </div>
        ))}
      </div>
    </main>
  );
}