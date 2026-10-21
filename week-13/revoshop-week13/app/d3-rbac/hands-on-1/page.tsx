"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// ===== Lecture 2's AuthContext + useAuth() (recreated here in one file) =====
type AuthValue = {
	isLoggedIn: boolean;
	currentUser: { id: number; username: string; role: string } | null;
};
const AuthContext = createContext<AuthValue | null>(null);
function useAuth(): AuthValue {
	return useContext(AuthContext)!;
}

// ===== A FAKE useRouter() — replace() records where we got sent =============
type RouterValue = { replace: (path: string) => void };
const RouterContext = createContext<RouterValue | null>(null);
function useRouter(): RouterValue {
	return useContext(RouterContext)!;
}

// A tiny "you were redirected" banner so the redirect is visible on screen.
function Redirecting({ to, reason }: { to: string; reason: string }) {
	return (
		<div className="border border-amber-300 bg-amber-50 text-amber-800 rounded-lg p-4 text-sm">
			&#9888; {reason} &rarr; redirecting to <b>{to}</b>
		</div>
	);
}

// ===== WORKED EXAMPLE — ProtectedRoute (authentication only) ===============
function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { isLoggedIn } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoggedIn) router.replace("/login");
	}, [isLoggedIn]);

	if (!isLoggedIn) return <Redirecting to="/login" reason="Not logged in" />;
	return children;
}

// ===== YOUR TURN — AdminRoute (login AND admin role) =======================
function AdminRoute({ children }: { children: React.ReactNode }) {
	const { isLoggedIn, currentUser } = useAuth();
	const router = useRouter();

	useEffect(() => {
		// TODO 1: redirect rules, login checked FIRST
		if (!isLoggedIn) router.replace("/login");
		else if (currentUser?.role !== "admin") router.replace("/");
	}, [isLoggedIn, currentUser]);

	// TODO 2: render guards (return BEFORE children)
	if (!isLoggedIn) return <Redirecting to="/login" reason="Not logged in" />;
	if (currentUser?.role !== "admin")
		return <Redirecting to="/" reason="Access denied" />;

	return children;
}

// ===== YOUR TURN — PublicOnlyRoute (only for logged-OUT users) =============
function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
	const { isLoggedIn } = useAuth();
	const router = useRouter();

	// TODO 3: redirect to '/' when the user IS logged in (inverted condition),
	// then guard the render the same way.

	return children;
}

// ===== The protected page AdminRoute is guarding ===========================
function DashboardStub() {
	const { currentUser } = useAuth();
	return (
		<div className="border border-green-300 bg-green-50 text-green-800 rounded-lg p-4 text-sm">
			&#10003; Admin verified &rarr; dashboard loaded. Welcome,{" "}
			<b>{currentUser?.username}</b>.
		</div>
	);
}

export default function App() {
	const [session, setSession] = useState("out"); // 'out' | 'customer' | 'admin'
	const [redirectLog, setRedirectLog] = useState("");

	const auth = {
		isLoggedIn: session !== "out",
		currentUser:
			session === "admin"
				? { id: 1, username: "admin", role: "admin" }
				: session === "customer"
					? { id: 42, username: "johndoe", role: "customer" }
					: null,
	};
	const router: { replace: (path: string) => void } = {
		replace: (path: string) => setRedirectLog(path),
	};

	// useEffect(() => {
	// 	setRedirectLog("");
	// }, [session]);

	const btn = (s: string, label: string) => (
		<button
			onClick={() => setSession(s)}
			className={
				"px-3 py-1.5 rounded text-sm " +
				(session === s ? "bg-gray-900 text-white" : "bg-white border")
			}
		>
			{label}
		</button>
	);

	return (
		<AuthContext.Provider value={auth}>
			<RouterContext.Provider value={router}>
				<main className="font-sans p-6 bg-gray-50 min-h-screen">
					<p className="text-xs text-gray-500 mb-3">
						localhost:3000/dashboard (wrapped in AdminRoute)
					</p>
					<div className="flex gap-2 mb-4">
						{btn("out", "Logged out")}
						{btn("customer", "Customer")}
						{btn("admin", "Admin")}
					</div>
					{redirectLog && (
						<p className="text-xs text-gray-500 mb-3">
							router.replace('{redirectLog}') was called
						</p>
					)}
					<div className="max-w-md">
						<AdminRoute>
							<DashboardStub />
						</AdminRoute>
					</div>
				</main>
			</RouterContext.Provider>
		</AuthContext.Provider>
	);
}
