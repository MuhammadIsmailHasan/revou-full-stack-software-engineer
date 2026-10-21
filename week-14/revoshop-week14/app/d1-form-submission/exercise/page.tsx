'use client'
import React, { useState } from 'react';

async function createPostArticle({title, description} : {title: string, description?: string}) : Promise<{id: number, userId: number, title: string, body: string}>{
    const base = 'https://dummyjson.com/';
    const response = await fetch(`${base}/posts/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: title,
            userId: 5,
            body: description
        })
    })

    return await response.json();
}

export default function App() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [formError, setFormError] = useState('');
    const [success, setSuccess] = useState('');
    const [toast, setToast] = useState('');
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setFormError(''); setSuccess(''); setToast('');

        if (title.trim() === "") {
            setFormError("title is required");
            return;
        }

        setSubmitting(true);

        const data = await createPostArticle({title, description});
        if (data) {
            setTitle('');
            setDescription('');
            setSuccess('create post successfully');
        }

        setSubmitting(false);
    }

    return (
        <main className="font-sans p-6 bg-gray-50 min-h-screen">
            <form onSubmit={handleSubmit} className="max-w-sm bg-white border rounded-lg p-5 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="font-semibold text-black">Post Article</h2>
                    <span className="text-gray-400">x</span>
                </div>

                <div className='my-2'>
                    <label className="text-sm text-black">Title</label>
                    {/* TODO 4: make this input controlled (value + onChange) */}
                    <input className="w-full border rounded px-3 py-2 mb-1" 
                        placeholder="Enter title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <div className='my-2'>
                    <label className="text-sm text-black">Description</label>
                    <input className="w-full border rounded px-3 py-2 mb-1" 
                        placeholder="Enter description" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/>
                </div>

                {formError && <p className="text-sm text-red-600 mb-2">{formError}</p>}

                <div className="flex gap-2 mt-2">
                <button type="button" onClick={() => {setTitle(''); setDescription(''); }} className="px-4 py-2 border rounded text-gray-600">Cancel</button>
                {/* TODO 5: disable Add when name is empty or submitting */}
                <button type="submit" disabled={!title.trim() || submitting} className="px-4 py-2 bg-gray-900 text-white rounded disabled:opacity-50">
                    {submitting ? 'Saving…' : 'Add'}
                </button>
                </div>

                {success && <p className="mt-3 text-sm bg-green-50 text-green-700 border border-green-200 rounded px-3 py-2">&#10003; {success}</p>}
            </form>

            {toast && (
                <div className="fixed bottom-4 right-4 bg-red-600 text-white text-sm px-4 py-2 rounded shadow">
                    {toast}
                </div>
            )}
        </main>
    );
}