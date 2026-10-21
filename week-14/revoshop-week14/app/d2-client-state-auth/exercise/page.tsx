'use client'
import React, { useState } from 'react';

// Simulates POST http://localhost:5000/auth/login on the Flask backend.
// Real call:
//   await fetch(base + '/auth/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, password }),
//   });

interface RegisterUserForm {
    email: string;
    password: string;
}

interface RegisterUserFormErrors {
    email?: string;
    password?: string;
}

interface mockPostUserResponse {
    ok: boolean;
    status: number;
    json: () => Promise<{error: string; field: string} | {error: string} | {id: number; username: string, email: string, role: string}>;
}

function mockPostLogin(body: RegisterUserForm) : Promise<mockPostUserResponse> {
    return new Promise((resolve) => {
        setTimeout(() => {
        if (!body.email) {
            resolve({ ok: false, status: 400, json: () => Promise.resolve({ error: 'Email is required', field: 'email' }) });
        } else if (!body.password) {
            resolve({ ok: false, status: 400, json: () => Promise.resolve({ error: 'Password is required', field: 'password' }) });
        } else if (body.email === 'admin@email.com' && body.password === 'admin123') {
            resolve({ ok: true, status: 200, json: () => Promise.resolve({ id: 1, username: 'admin', email: body.email, role: 'admin' }) });
        } else if (body.email === 'john@email.com' && body.password === 'secret123') {
            resolve({ ok: true, status: 200, json: () => Promise.resolve({ id: 42, username: 'johndoe', email: body.email, role: 'customer' }) });
        } else {
            resolve({ ok: false, status: 401, json: () => Promise.resolve({ error: 'Invalid email or password' }) });
        }
        }, 400);
    });
}

// Pretend this comes from useAuth(); it updates the app-wide session.
function useFakeAuth() {
    return { login: (user: { id: number; username: string; email: string; role: string }) => console.log('login(user) called with', user) };
}

export default function App() {
    const { login } = useFakeAuth();

    const [registerUserForm, setRegisterUserForm] = useState<RegisterUserForm>({ email: 'john@email.com', password: '' });
    const [fieldErrors, setFieldErrors] = useState<RegisterUserFormErrors>({});
    const [formError, setFormError] = useState('');
    const [redirectedTo, setRedirectedTo] = useState('');
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        setFieldErrors({});
        setFormError('');
        setSubmitting(true);

        const res = await mockPostLogin(registerUserForm);

        // TODO 1: on res.status === 200
        // TODO 2: on res.status === 401
        // TODO 3: on res.status === 400

        if (res.status === 200) {
            const user = await res.json();
            if ('error' in user) {
                setFormError(user.error);
                setSubmitting(false);
                return;
            }
            localStorage.setItem('user', JSON.stringify(user));
            login(user);
            setRedirectedTo(user.role === 'admin' ? '/dashboard' : '/');
        } else if (res.status === 401) {
            const data = await res.json();
            if ('error' in data) setFormError(data.error);
        } else if (res.status === 400) {
            const data = await res.json();
            if ('error' in data) {
                const field = 'field' in data ? data.field : undefined;
                if (field === 'email' || field === 'password') {
                    setFieldErrors({ [field]: data.error });
                } else {
                    setFormError(data.error);
                }
            }
        }

        setSubmitting(false);
    }

    const field = 'w-full border rounded px-3 py-2 text-gray-500';
    const errText = 'text-sm text-red-600 mt-1 mb-2';

    if (redirectedTo) {
        return (
        <main className="font-sans p-6 bg-gray-50 min-h-screen">
            <p className="text-xs text-gray-500 mb-3">localhost:3000{redirectedTo}</p>
            <div className="max-w-sm bg-green-50 border border-green-200 text-green-700 rounded-lg p-5">
            &#10003; Logged in — redirected to {redirectedTo}.
            </div>
        </main>
        );
    }

    return (
        <main className="font-sans p-6 bg-gray-50 min-h-screen">
            <p className="text-xs text-gray-500 mb-3">localhost:3000/login</p>
            <nav className="max-w-sm flex gap-4 text-sm mb-4">
                <span className="font-bold">RevoShop</span>
                <span className="text-gray-500 ml-auto">Login</span>
                <span className="text-gray-500">Register</span>
            </nav>

            <form onSubmit={handleSubmit} className="max-w-sm bg-white border rounded-lg p-5 shadow-sm">
                <h2 className="font-semibold text-lg mb-3">Login</h2>

                <label className="text-sm text-black">Email</label>
                {/* TODO 4: make this input controlled (value + onChange) */}
                <input 
                    className={field} 
                    value={registerUserForm.email}
                    onChange={(e) => setRegisterUserForm({...registerUserForm, email: e.target.value})}
                    placeholder="you@email.com" />
                {fieldErrors.email && <p className={errText}>{fieldErrors.email}</p>}

                <label className="text-sm text-black">Password</label>
                {/* TODO 5: make this input controlled (value + onChange), type="password" */}
                <input 
                    className={field} 
                    placeholder="••••••••" 
                    value={registerUserForm.password}
                    onChange={(e) => setRegisterUserForm({...registerUserForm, password: e.target.value})}/>
                {fieldErrors.password && <p className={errText}>{fieldErrors.password}</p>}

                {formError && <p className="mt-2 text-sm bg-red-50 text-red-700 border border-red-200 rounded px-3 py-2">{formError}</p>}

                <button type="submit" disabled={submitting} className="w-full mt-3 px-4 py-2 bg-gray-900 text-white rounded disabled:opacity-50">
                {submitting ? 'Signing in…' : 'Login'}
                </button>
            </form>

            <p className="max-w-sm text-xs text-gray-500 mt-3 text-center">
                Admin &rarr; redirects to /dashboard<br />
                Customer &rarr; redirects to /
            </p>
        </main>
    );
}