// Shared nav + cart counter (cart is kept in sessionStorage so it survives page changes)
const nav = document.querySelector("nav");
nav.innerHTML = `
	<a href="/" data-testid="nav-home">Home</a>
	<a href="/products" data-testid="nav-products">Products</a>
	<a href="/categories" data-testid="nav-categories">Categories</a>
	<a href="/dashboard" data-testid="nav-dashboard">Dashboard</a>
	<a href="/login" data-testid="nav-login">Login</a>
	<a href="/register" data-testid="nav-register">Register</a>
	<span style="margin-left:auto" data-testid="cart-count">Cart (0)</span>
	<span data-testid="nav-username" hidden></span>
	<button data-testid="nav-logout" hidden>Logout</button>`;

export const getCart = () => JSON.parse(sessionStorage.getItem("cart") ?? "[]");
export function addToCart(name) {
	sessionStorage.setItem("cart", JSON.stringify([...getCart(), name]));
	renderCart();
}
function renderCart() {
	document.querySelector("[data-testid=cart-count]").textContent =
		`Cart (${getCart().length})`;
}
renderCart();

// --- Auth (users and the session live in localStorage, so no backend is needed) ---
const DEMO_USER = {
	username: "demo",
	email: "demo@revoshop.com",
	password: "password123",
};
const getUsers = () => [
	DEMO_USER,
	...JSON.parse(localStorage.getItem("users") ?? "[]"),
];

export function registerUser(user) {
	const saved = JSON.parse(localStorage.getItem("users") ?? "[]");
	localStorage.setItem("users", JSON.stringify([...saved, user]));
}

// Returns true when the credentials match, and starts a session
export function login(email, password) {
	const user = getUsers().find(
		(u) => u.email === email && u.password === password,
	);
	if (user) localStorage.setItem("session", user.username);
	return Boolean(user);
}

function renderSession() {
	const username = localStorage.getItem("session");
	const name = document.querySelector("[data-testid=nav-username]");
	const logout = document.querySelector("[data-testid=nav-logout]");
	name.textContent = username ?? "";
	name.hidden = logout.hidden = !username;
	logout.onclick = () => {
		localStorage.removeItem("session");
		location.href = "/login";
	};
}
renderSession();
