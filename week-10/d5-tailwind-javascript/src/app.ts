// ============================================================
// CAPSTONE LOGIC — implement everything below.
// TypeScript contract (compile-time shapes you are building):
//   function getBadgeClasses(variant: BadgeVariant): string
//   function getCardClasses(inStock: boolean): string
// ============================================================

interface Product {
	id: number;
	name: string;
	price: number;
	category: string;
	inStock: boolean;
}
interface CartItem {
	product: Product;
	quantity: number;
}

interface Cart {
	items: CartItem[];
	totalItems: number;
	totalPrice: number;
}
type BadgeVariant = "success" | "warning" | "error";

// --- 1) DATA LAYER: at least 6 products (Product[]) ---
const products: Product[] = [
	{
		id: 1,
		name: "Wireless Mouse",
		price: 250000,
		category: "Accessories",
		inStock: true,
	},
	{
		id: 2,
		name: "Mechanical Keyboard",
		price: 500000,
		category: "Accessories",
		inStock: false,
	},
	{
		id: 3,
		name: "Laptop Pro 14",
		price: 15000000,
		category: "Computers",
		inStock: true,
	},
	{
		id: 4,
		name: "SB-C Hub",
		price: 200000,
		category: "Accessories",
		inStock: true,
	},
	{
		id: 5,
		name: "Monitor",
		price: 5000000,
		category: "Computers",
		inStock: false,
	},
	{
		id: 6,
		name: "Webcam",
		price: 100000,
		category: "Accessories",
		inStock: true,
	},
];
let cartItems: CartItem[] = [];

// --- 2) TYPED CLASS HELPERS ---
function getBadgeClasses(variant: BadgeVariant): string {
	const base = "text-xs font-semibold px-2 py-1 rounded-full";
	const variants: Record<BadgeVariant, string> = {
		success: "bg-green-100 text-green-800",
		warning: "bg-yellow-100 text-yellow-800",
		error: "bg-red-100 text-red-800",
	};
	return base + " " + variants[variant];
}

function getCardClasses(inStock: boolean): string {
	const base = "bg-white rounded-xl shadow-md p-4 transition flex flex-col";
	const result = inStock
		? `${base} hover:shadow-xl`
		: `${base} opacity-60 grayscale`;
	return result;
}

function formatRupiah(n: number) {
	return "Rp " + n.toLocaleString("id-ID");
}

// --- 3) RENDER THE GRID ---
function renderProducts(list: Product[]): void {
	const grid = document.getElementById("grid");
	if (!grid) return;

	grid.innerHTML = list
		.map(
			(p) => `
            <article class="${getCardClasses(p.inStock)}">
                <span class="${getBadgeClasses(p.inStock ? "success" : "error")}">
                    ${p.inStock ? "In stock" : "Sold out"}
                </span>
                <h2 class="text-lg font-bold text-gray-900 truncate mt-2">${p.name}</h2>
                <p class="text-xl font-bold text-blue-600 mt-1">${formatRupiah(p.price)}</p>
                <span class="text-sm text-gray-500">${p.category}</span>
                <button data-id="${p.id}" class="add-btn w-full mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Add to Cart
                </button>
            </article>`,
		)
		.join("");
}

// --- 4) RENDER THE CART SUMMARY ---
function renderCart() {
	const summary: Cart = cartItems.reduce<Cart>(
		(acc, item) => {
			const quantity = item.quantity;
			acc.totalItems += quantity;
			acc.totalPrice += item.product.price * quantity;
			acc.items.push(item);
			return acc;
		},
		{ items: [], totalItems: 0, totalPrice: 0 },
	);

	const countEl = document.getElementById("cart-count");
	if (countEl) countEl.textContent = String(summary.totalItems);

	const totalEl = document.getElementById("cart-total");
	if (totalEl) totalEl.textContent = formatRupiah(summary.totalPrice);
}

// --- 5) ADD TO CART ---
function addToCart(id: number) {
	const product = products.find((p) => p.id === id);
	if (!product || !product.inStock) return;

	const existing = cartItems.find((item) => item.product.id === id);
	if (existing) {
		existing.quantity += 1;
	} else {
		cartItems.push({ product, quantity: 1 });
	}

	renderCart();
}

// --- 6) EVENTS ---
const grid = document.getElementById("grid");
if (grid) {
	grid.addEventListener("click", (event) => {
		const target = event.target as HTMLElement;
		const button = target.closest(".add-btn") as HTMLButtonElement | null;
		if (!button) return;

		const id = Number(button.dataset.id);
		if (!Number.isNaN(id)) {
			addToCart(id);
		}
	});
}

const searchInput = document.getElementById(
	"search",
) as HTMLInputElement | null;
if (searchInput) {
	searchInput.addEventListener("input", (event) => {
		const target = event.target as HTMLInputElement;
		const query = target.value.trim().toLowerCase();
		const filtered = products.filter((product) =>
			product.name.toLowerCase().includes(query),
		);
		renderProducts(filtered);
	});
}

// --- 7) INITIAL RENDER ---
renderProducts(products);
renderCart();
