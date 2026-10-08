'use client'
import { useState } from 'react';

// On the real route app/products/[id]/page.tsx, Next.js calls this function
// with the route params and injects the returned title/description into <head>.
// We simulate different routes by changing the id below.
async function generateMetadata({ params } : { params: Record<string, string> }) {
  // TODO Step 2: build a dynamic title from params.id, e.g. "Product #42 — My Store"
    return {
        title: `Product #${params.id} — My Store`,
        description: 'Product details.',
    };
}

export default function HandsOn3() {
    const [id, setId] = useState('42');
    const [meta, setMeta] = useState({ title: '(click Run / change id)', description: '' });

    // Re-run generateMetadata whenever the id changes (mimics navigating to a new route).
    async function runForId(nextId: string) {
        setId(nextId);
        const result = await generateMetadata({ params: { id: nextId } });
        setMeta(result);
    }

    return (
        <main className="font-sans p-6 max-w-xl">
            <p className="font-mono text-xs text-gray-400 mb-3">app/products/[id]/page.tsx</p>

            <label className="text-sm text-gray-600">Route param id:&nbsp;</label>
            <div className="flex gap-2 my-2">
                {['7', '42', '108'].map((n) => (
                <button
                    key={n}
                    onClick={() => runForId(n)}
                    className={n === id
                    ? 'px-3 py-1 rounded bg-indigo-600 text-white text-sm'
                    : 'px-3 py-1 rounded border text-sm'}
                >
                    /products/{n}
                </button>
                ))}
            </div>

            <div className="mt-4 inline-flex items-center gap-2 bg-gray-100 rounded-t-lg px-3 py-1.5 border">
                <span className="w-3 h-3 rounded-full bg-gray-300" />
                <span className="font-medium">{meta.title}</span>
            </div>
            <div className="border rounded-b-lg rounded-tr-lg p-4 bg-gray-900 text-gray-100 font-mono text-xs leading-6">
                <div className="text-gray-400">&lt;head&gt;</div>
                <div className="pl-4">&lt;title&gt;{meta.title}&lt;/title&gt;</div>
                <div className="pl-4">&lt;meta name=&quot;description&quot; content=&quot;{meta.description}&quot;&gt;</div>
                <div className="text-gray-400">&lt;/head&gt;</div>
            </div>
        </main>
    );
}