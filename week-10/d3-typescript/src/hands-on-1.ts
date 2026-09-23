// ============================================================
// Hands-On 1: A typed, nested Cart and the functions over it.
// Run locally with ts-node to see the full type checking;
// here the types are stripped and the data flow prints to console.
// ============================================================

// TODO 1: the three interfaces (User, Product, Cart)
interface User {
	id: number;
	name: string;
}
interface Product {
	id: number;
	name: string;
	price: number;
}
interface Cart {
	user: User;
	items: Product[];
	totalPrice: number;
}

// TODO 2: getTotal — the single source of truth for the total
function getTotal(items: Product[]) {
	return items.reduce((sum, p) => sum + p.price, 0);
}

// TODO 3: addItem — returns a NEW cart (don't mutate the old one)
function addItem(cart: Cart, product: Product) {
	const items = [...cart.items, product];
	console.log(items);
	return { ...cart, items, totalPrice: getTotal(items) };
}

// TODO 4: removeItem — filter by id, then recompute the total
function removeItem(cart: Cart, productId: number) {
	const items = cart.items.filter((p) => p.id !== productId);
	return { ...cart, items, totalPrice: getTotal(items) };
}

// An empty starting cart for Ayu
let cart: Cart = {
	user: { id: 1, name: "Ayu" },
	items: [],
	totalPrice: 0,
};

const laptop = { id: 10, name: "Laptop", price: 15000000 };
const mouse = { id: 11, name: "Mouse", price: 200000 };

cart = addItem(cart, laptop);
cart = addItem(cart, mouse);
console.log(
	cart.user.name + "'s cart:",
	cart.items.length,
	"items, total Rp",
	cart.totalPrice.toLocaleString("id-ID"),
);

cart = removeItem(cart, 10); // remove the laptop
console.log(
	"After removing the laptop:",
	cart.items.length,
	"items, total Rp",
	cart.totalPrice.toLocaleString("id-ID"),
);

// TODO 5 (local editor with ts-node): this is a COMPILE error —
// addItem(cart, 123);
//               ~~~ number is not assignable to parameter of type 'Product'
