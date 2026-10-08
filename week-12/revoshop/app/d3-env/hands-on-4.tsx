
'use client'
import { useState } from 'react';

// ── 1. Simulated .env.local ────────────────────────────────────────────────
const ENV_FILE: Record<string, string> = {
    NEXT_PUBLIC_API_BASE_URL: 'http://localhost:5000',
    API_SECRET_KEY: 'super-secret-key-123',
};

// Mimics process.env in the browser: only NEXT_PUBLIC_ keys come through.
function clientEnv(key: string) {
    return key.startsWith('NEXT_PUBLIC_') ? ENV_FILE[key] : undefined;
}

// ── 2. Simulated root + static page metadata ───────────────────────────────
const ROOT_METADATA = { title: 'RevoShop', description: 'Your one-stop online store.' };

// TODO 1: give each static route a real { title, description }
const PAGES = [
    { path: '/home',           metadata: { title: 'Home — RevoShop', description: 'Welcome to RevoShop.' } },
    { path: '/products',   metadata: { title: 'Product', description: 'this is product' } },
    { path: '/categories', metadata: { title: 'categories', description: 'this is categories' } },
    { path: '/orders',     metadata: { title: 'orders', description: 'this is orders' } },
];

// ── 3. Simulated dynamic route app/products/[id]/page.tsx ───────────────────
async function generateMetadata({ params }: { params: { id: string } }) {
    // TODO 2: return a title like "Product #<id> — RevoShop" from params.id
    return { title: `Product #${params.id} — RevoShop`, description: 'Product details.' };
}   

export default function HandsOn4() {
    const [route, setRoute] = useState('/');
    const [dynamicMeta, setDynamicMeta] = useState<{ title: string; description: string } | null>(null);

    const base = clientEnv('NEXT_PUBLIC_API_BASE_URL');
    const secret = clientEnv('API_SECRET_KEY');

    const staticPage = PAGES.find((p) => p.path === route);

    async function go(path: string, id?: string) {
        setRoute(path);
        if (id) setDynamicMeta(await generateMetadata({ params: { id } }));
        else setDynamicMeta(null);
    }

    const meta = dynamicMeta ?? (staticPage ? staticPage.metadata : ROOT_METADATA);

    return (
        <div className="font-sans flex gap-4 p-4 text-sm">
            <nav className="w-44 shrink-0 border-r pr-3">
                <p className="text-xs uppercase text-gray-400 mb-2">Routes</p>
                {PAGES.map((p) => (
                    <button key={p.path} onClick={() => go(p.path)}
                        className={route === p.path && !dynamicMeta
                        ? 'block w-full text-left font-semibold text-indigo-600 py-1'
                        : 'block w-full text-left text-gray-600 hover:text-black py-1'}>
                        {p.path}
                    </button>
                ))}
                <button onClick={() => go('/products/42', '42')}
                    className={dynamicMeta
                        ? 'block w-full text-left font-semibold text-indigo-600 py-1'
                        : 'block w-full text-left text-gray-600 hover:text-black py-1'}>
                    /products/42
                </button>
            </nav>

            <div className="flex-1">
                {/* Env-var panel */}
                <div className="border rounded-lg p-3 mb-3">
                    <p className="text-xs text-gray-500">NEXT_PUBLIC_API_BASE_URL</p>
                    <p className="font-mono text-green-700">{base ?? 'undefined'}</p>
                    <p className="text-xs text-gray-500 mt-2">API_SECRET_KEY</p>
                    <p className="font-mono text-red-700">{secret ?? 'undefined (server only)'}</p>
                </div>

                {/* Head panel */}
                <div className="inline-flex items-center gap-2 bg-gray-100 rounded-t-lg px-3 py-1.5 border">
                    <span className="w-3 h-3 rounded-full bg-gray-300" />
                    <span className="font-medium">{meta.title}</span>
                </div>
                <div className="border rounded-b-lg rounded-tr-lg p-4 bg-gray-900 text-gray-100 font-mono text-xs leading-6">
                    <div className="text-gray-400">&lt;head&gt;</div>
                    <div className="pl-4">&lt;title&gt;{meta.title}&lt;/title&gt;</div>
                    <div className="pl-4">&lt;meta name=&quot;description&quot; content=&quot;{meta.description}&quot;&gt;</div>
                    <div className="text-gray-400">&lt;/head&gt;</div>
                </div>
            </div>
        </div>
    );
}