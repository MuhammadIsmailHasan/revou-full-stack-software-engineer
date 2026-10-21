'use client'
import React, { useState } from 'react';

// Simulates POST http://localhost:5000/users on the Flask backend.
// Real call:
//   const res = await fetch(base + '/users', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ username, email, password_hash: password }),
//   });

interface RegisterForm {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

interface RegisterFormData {
    username: string,
    email: string,
    password_hash: string
}

interface RegisterFormErrors {
    username?: string,
    email?: string,
    password?: string,
    confirmPassword?: string
}

interface mockPostUserResponse {
    ok: boolean,
    status: number,
    json: () => Promise<{error: string} | {id: number; username: string, email: string, role: string}>;
}

function mockPostUser(body: RegisterFormData): Promise<mockPostUserResponse> {
    return new Promise<mockPostUserResponse>((resolve) => {
        setTimeout(() => {
        if (body.email === 'taken@email.com') {
            resolve({ ok: false, status: 409, json: () => Promise.resolve({ error: 'Email already registered' }) });
        } else {
            resolve({
                ok: true,
                status: 201,
                json: () => Promise.resolve({ id: 42, username: body.username, email: body.email, role: 'customer' }),
            });
        }
        }, 400);
    });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function App() {
    const [form, setForm] = useState<RegisterForm>({
        username: 'johndoe',
        email: 'bad-email',
        password: 'secret',
        confirmPassword: 'sec',
    });
    const [errors, setErrors] = useState<RegisterFormErrors>({});
    const [formError, setFormError] = useState('');
    const [redirectedTo, setRedirectedTo] = useState('');
    const [submitting, setSubmitting] = useState(false);

    function update(field: keyof RegisterForm, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    function validate(f: RegisterForm) : RegisterFormErrors {
        const e : RegisterFormErrors = {};
        // TODO 1: fill in the four rules
            if (!f.username.trim()) e.username = 'Username is required';
            if (!EMAIL_RE.test(f.email)) e.email = 'Enter a valid email address';
            if (f.password.length < 8) e.password = 'Password must be at least 8 characters';
            if (f.confirmPassword !== f.password) e.confirmPassword = 'Passwords do not match';
        return e;
    }

    async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        setFormError('');
        setRedirectedTo('');

        const errs = validate(form);
        setErrors(errs);
        if (Object.keys(errs).length > 0) return; // stop — do not POST invalid data

        setSubmitting(true);
        const res = await mockPostUser({
            username: form.username,
            email: form.email,
            password_hash: form.password,
        });

        // TODO 2: on res.status === 201
        if (res.status === 201) {
            const user = await res.json();
            localStorage.setItem('user', JSON.stringify(user));
            setRedirectedTo('/');  // simulates router.push('/')
        }
        
        // TODO 3: else if res.status === 409
        if (res.status === 409) {
            const data = await res.json();
            if ('error' in data) setFormError(data.error);
        }

        setSubmitting(false);
    }

    const field = 'w-full border rounded px-3 py-2 text-gray-400';
    const errText = 'text-sm text-red-600 mt-1 mb-2';

    if (redirectedTo) {
        return (
        <main className="font-sans p-6 bg-gray-50 min-h-screen">
            <p className="text-xs text-gray-500 mb-3">localhost:3000{redirectedTo}</p>
            <div className="max-w-sm bg-green-50 border border-green-200 text-green-700 rounded-lg p-5">
            &#10003; Account created — redirected to {redirectedTo}. Welcome, {form.username}!
            </div>
        </main>
        );
    }

    return (
        <main className="font-sans p-6 bg-gray-50 min-h-screen">
            <p className="text-xs text-gray-500 mb-3">localhost:3000/register</p>
            <nav className="max-w-sm flex gap-4 text-sm mb-4">
                <span className="font-bold">RevoShop</span>
                <span className="text-gray-500 ml-auto">Login</span>
                <span className="text-gray-500">Register</span>
            </nav>

            <form onSubmit={handleSubmit} className="max-w-sm bg-white border rounded-lg p-5 shadow-sm">
                <h2 className="font-semibold text-lg mb-3 text-black">Create account</h2>

                <label className="text-sm text-black">Username</label>
                <input className={field} value={form.username} onChange={(e) => update('username', e.target.value)} />
                {errors.username && <p className={errText}>{errors.username}</p>}

                <label className="text-sm text-black">Email</label>
                <input className={field} value={form.email} onChange={(e) => update('email', e.target.value)} />
                {errors.email && <p className={errText}>{errors.email}</p>}

                <label className="text-sm text-black">Password</label>
                <input type="password" className={field} value={form.password} onChange={(e) => update('password', e.target.value)} />
                {errors.password && <p className={errText}>{errors.password}</p>}

                <label className="text-sm text-black">Confirm password</label>
                <input type="password" className={field} value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} />
                {errors.confirmPassword && <p className={errText}>{errors.confirmPassword}</p>}

                {formError && <p className="mt-2 text-sm bg-red-50 text-red-700 border border-red-200 rounded px-3 py-2">{formError}</p>}

                <button type="submit" disabled={submitting} className="w-full mt-3 px-4 py-2 bg-gray-900 text-white rounded disabled:opacity-50">
                {submitting ? 'Creating…' : 'Register'}
                </button>
            </form>
        </main>
    );
}