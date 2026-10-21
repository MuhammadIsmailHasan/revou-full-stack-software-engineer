'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';

// ---- The shape of a logged-in user --------------------------------------
interface User { id: number; username: string; email: string; role: string }

interface AuthContextValue {
    currentUser: User | null;
    isLoggedIn: boolean;
    login: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    // TODO 1: restore the session on mount.
    useEffect(() => {
        const raw = localStorage.getItem('user');
        if (raw) setCurrentUser(JSON.parse(raw));
    }, []);

    function login(user: User) {
        // TODO 2a: 
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user))
    }

    function logout() {
        // TODO 2b: 
        setCurrentUser(null);
        localStorage.removeItem('user')
    }

    const value = {
        currentUser,
        isLoggedIn: currentUser !== null,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook — the only way components read auth state.
function useAuth() {
    const ctx = useContext(AuthContext);
    if (ctx === null) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
}

// ---- Header reacts to auth state ----------------------------------------
function Header() {
    const { currentUser, isLoggedIn, logout } = useAuth();
    const cartCount = 3; // pretend the cart has 3 items

    return (
        <nav className="flex items-center gap-4 bg-white border rounded px-4 py-3 text-sm">
            <span className="font-bold">RevoShop</span>
            <div className="ml-auto flex items-center gap-4">
                {isLoggedIn ? (
                    <>
                        <p className="text-sm text-black">Hi, {currentUser?.username}</p>
                        <div className="flex items-center gap-1 text-sm">
                            <span aria-label="cart">🛒</span>
                            <span>{cartCount}</span>
                        </div>
                        <button onClick={logout} className="px-3 py-1 border rounded text-sm">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <a href="#" className="text-sm text-gray-700">Register</a>
                        <a href="#" className="text-sm text-gray-700">Login</a>
                    </>
                )}
            </div>
        </nav>
    );
}

    // ---- A tiny app to exercise the context ---------------------------------
    function Demo() {
        const { isLoggedIn, login, logout } = useAuth();
        return (
            <div className="mt-4 flex gap-2">
                <button
                        onClick={() => login({ id: 42, username: 'ismail', email: 'john@email.com', role: 'customer' })}
                        className="px-4 py-2 bg-gray-900 text-white rounded"
                    >
                        Simulate login
                </button>
                <button onClick={logout} className="px-4 py-2 border rounded bg-red-400">Logout</button>
                <span className="self-center text-sm text-gray-500">
                    isLoggedIn: {String(isLoggedIn)}
                </span>
            </div>
        );
    }

export default function App() {
    return (
        <AuthProvider>
            <main className="font-sans p-6 bg-gray-50 min-h-screen">
                <Header />
                <Demo />
            </main>
        </AuthProvider>
    );
}