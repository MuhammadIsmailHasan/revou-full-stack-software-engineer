// DAY 1
// const ROUTES = [
//   { url: '/',           file: 'app/page.tsx',              heading: 'Home',          backend: 'GET /' },
//   { url: '/products',   file: 'app/products/page.tsx',     heading: 'Products',      backend: 'GET /products' },
//   { url: '/categories', file: 'app/categories/page.tsx',   heading: 'Categories',    backend: 'GET /categories' },
//   // TODO Step 3: add the /orders route -> file 'app/orders/page.tsx', heading 'Orders', backend 'GET /orders'
// ];

// export default function RouteMap() {
//   return (
//     <main className="p-8 font-sans">
//       <h1 className="text-2xl font-bold mb-1">RevoShop Routes</h1>
//       <p className="text-gray-500 mb-6">Each card is one page.tsx file</p>
//       <div className="grid gap-3">
//         {ROUTES.map((r) => (
//           <div key={r.url} className="border rounded-lg p-4">
//             <h2 className="text-lg font-semibold">{r.heading}</h2>
//             <p className="text-blue-600 font-mono text-sm">{r.url}</p>
//             <p className="text-gray-400 font-mono text-xs">{r.file}</p>
//             <p className="text-green-600 font-mono text-xs">→ {r.backend}</p>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }



// DAY 2 - HANDS ON 1
// 'use client'
// import { useState } from "react";
// import Link from "next/link";

// function LinkComponents({ href, onNavigate, children }: {href: string; onNavigate: (path: string) => void; children: React.ReactNode}) {
//     return (
//         <Link
//             href={href}
//             onClick={(e) => { e.preventDefault(); onNavigate(href); }}
//             className="text-gray-500 hover:text-black cursor-pointer"
//         >
//             {children}
//         </Link>
//     );
// }

// const NAV_LINKS = [
//     { href: '/',           label: 'Home' },
//     { href: '/products',   label: 'Products' },
//     { href: '/categories', label: 'Categories' },
//     { href: '/orders',     label: 'Orders' },
//     { href: '/dashboard', label: 'Dashboard' }
// ];

// export default function App() {
//   const [currentPath, setCurrentPath] = useState('/');

//   return (
//     <div className="font-sans">
//       <header className="flex items-center gap-6 border-b px-6 py-3">
//         <span className="font-bold text-lg">RevoShop</span>
//         <nav className="flex gap-4 text-sm">
//           {NAV_LINKS.map((link) => (
//             <LinkComponents key={link.href} href={link.href} onNavigate={setCurrentPath}>
//               {link.label}
//             </LinkComponents>
//           ))}
//         </nav>
//       </header>
//       <main className="p-8">
//         <p className="text-gray-400 text-sm">Client-side transition — no page reload</p>
//         <h1 className="text-2xl font-bold">You are on: {currentPath}</h1>
//       </main>
//     </div>
//   );
// }




// DAY 2 - HANDS ON 2
// 'use client'
// import { useState } from 'react';
// import Link from 'next/link';

// const NAV_LINKS = [
//   { href: '/',           label: 'Home' },
//   { href: '/products',   label: 'Products' },
//   { href: '/categories', label: 'Categories' },
//   { href: '/orders',     label: 'Orders' },
//   { href: '/dashboard',  label: 'Dashboard' },
// ];

// export default function App() {
//   const [currentPath, setCurrentPath] = useState('/products');

//   const isActive = (href: string) => currentPath === href;

//   return (
//     <div className="font-sans">
//       <header className="flex items-center gap-6 border-b px-6 py-3">
//         <span className="font-bold text-lg">RevoShop</span>
//         <nav className="flex gap-4 text-sm">
//           {NAV_LINKS.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               onClick={(e) => { e.preventDefault(); setCurrentPath(link.href); }}
//               className={isActive(link.href)
//                 ? 'cursor-pointer font-semibold text-blue-500 underline'
//                 : 'text-gray-500 hover:text-black cursor-pointer'}
//             >
//               {link.label}
//             </Link>
//           ))}
//         </nav>
//       </header>
//       <main className="p-8">
//         <h1 className="text-2xl font-bold">{currentPath}</h1>
//         <p className="text-gray-500">Current section is highlighted in the nav above</p>
//       </main>
//     </div>
//   );
// }



// DAY 2 - HANDS ON 3
// 'use client'
// import { useState } from 'react';

// const PRODUCTS = [
//   { id: 1, name: 'Laptop Stand', price: 'Rp 250.000', inStock: true },
//   { id: 2, name: 'Wireless Mouse', price: 'Rp 150.000', inStock: true },
//   { id: 3, name: 'USB-C Hub', price: 'Rp 320.000', inStock: false },
// ];

// export default function App() {
//   // Simulated browser URL. router.push(x) sets it; useSearchParams reads from it.
//   const [url, setUrl] = useState('/products');
//   const [query, setQuery] = useState('');

//   // Stands in for: const router = useRouter(); router.push(target);
//   const navigate = (target: string) => setUrl(target);

//   // Stands in for: const params = useSearchParams(); params.get('search');
//   const searchParam = url.includes('?search=')
//     ? decodeURIComponent(url.split('?search=')[1])
//     : '';

//   const visible = searchParam
//     ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(searchParam.toLowerCase()))
//     : PRODUCTS;

//   const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       // TODO Step 2: push to /products?search=<query>
//       navigate(`/products?search=${query}`);
//     }
//   };

//   return (
//     <div className="font-sans p-6">
//       <p className="text-gray-400 font-mono text-xs mb-3">localhost:3000{url}</p>
//       <input
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         onKeyDown={onKeyDown}
//         placeholder="Search products..."
//         className="w-full border rounded-lg px-3 py-2 mb-3"
//       />
//       {searchParam && (
//         <p className="text-sm text-gray-600 mb-3">
//           Filtering by: <span className="font-semibold">{searchParam}</span>
//         </p>
//       )}
//       <div className="grid gap-3">
//         {visible.map((p) => (
//           <div key={p.id} className="border rounded-lg p-4">
//             <h2 className="font-semibold">{p.name}</h2>
//             <p className="text-gray-600 text-sm">{p.price}</p>
//             <span className={p.inStock
//               ? 'text-xs text-green-700 bg-green-100 rounded px-2 py-0.5'
//               : 'text-xs text-red-700 bg-red-100 rounded px-2 py-0.5'}>
//               {p.inStock ? 'In stock' : 'Out of stock'}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// DAY 2 - HANDS ON 4
'use client'
import Link from 'next/link';
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const NAV_LINKS = [
  { href: '/',           label: 'Home' },
  { href: '/products',   label: 'Products' },
  { href: '/categories', label: 'Categories' },
];

const PRODUCTS = [
  { id: 1, name: 'Laptop Stand',   price: 'Rp 250.000', inStock: true },
  { id: 2, name: 'Wireless Mouse', price: 'Rp 150.000', inStock: true },
  { id: 3, name: 'USB-C Hub',      price: 'Rp 320.000', inStock: false },
];

export default function App() {
  const router = useRouter()
  const parameters = useSearchParams()
  
  const [url, setUrl] = useState('/products');
  const [query, setQuery] = useState('');

  // Stands in for usePathname(): the path part of the url, without the query string.
  const pathname = url.split('?')[0];

  const search = url.includes('?search=')
    ? decodeURIComponent(url.split('?search=')[1])
    : '';
  const searchParam = parameters.get('search')

  const isActive = (href: string) => pathname === href;

  const visible = search ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(search.toLocaleLowerCase())) : PRODUCTS;
  const visibleParam = searchParam ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(searchParam.toLocaleLowerCase())) : PRODUCTS;

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setUrl(`/products?search=${query}`);
      router.push(`?search=${encodeURIComponent(query)}`)
    }
  };

  return (
    <div className="font-sans">
      <nav className="flex gap-4 text-sm">
        {NAV_LINKS.map((nav) => (
          <Link key={nav.href}
            href={nav.href}
            onClick={(e) => { e.preventDefault(); setUrl(nav.href)}}
            className={isActive(nav.href)
                ? 'cursor-pointer font-semibold text-blue-500 underline'
                : 'text-gray-500 hover:text-black cursor-pointer'}
          >
            {nav.label}
          </Link>          
        ))}
      </nav>

      <main className="p-6">
        <p className="text-gray-400 font-mono text-xs mb-3">localhost:3000{url}</p>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search products..."
          className="w-full border rounded-lg px-3 py-2 mb-3"
        />

        {searchParam && (
          <p className="text-sm text-gray-600 mb-3">
          Filtering by: <span className="font-semibold">{searchParam}</span></p>
        )}

        <div className='grid gap-3'>
          {visibleParam.map((p) => (
            <div key={p.id} className="border rounded-lg p-4">
              <h2 className="font-semibold">{p.name}</h2>
              <p className="text-gray-600 text-sm">{p.price}</p>
              <span className={p.inStock
                ? 'text-xs text-green-700 bg-green-100 rounded px-2 py-0.5'
                : 'text-xs text-red-700 bg-red-100 rounded px-2 py-0.5'}>
                {p.inStock ? 'In stock' : 'Out of stock'}
              </span>
            </div>))}
        </div>
      </main>
    </div>
  );
}