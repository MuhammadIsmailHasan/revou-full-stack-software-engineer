// ============================================================
// Hands-On 1: Describe the shape of a Product with an interface.
// On your machine, tsc rejects any object that breaks the contract.
// ============================================================

// TODO 1: define the interface (name, price, category, inStock)
interface Product {
	name: string;
	price: number;
	category: string;
	inStock: boolean;
}

// TODO 2: a valid product
const laptop: Product = {
	name: "Laptop",
	price: 15000000,
	category: "Electronics",
	inStock: true,
};

// TODO 3: a second valid product
const mouse: Product = {
	name: "Wireless Mouse",
	price: 250000,
	category: "Accessories",
	inStock: false,
};

// TODO 4: a helper typed with the interface
function describe(p: Product): string {
	return p.name + " — Rp " + p.price.toLocaleString("id-ID");
}

console.log(describe(laptop));
console.log(describe(mouse));
console.log("Laptop in stock?", laptop.inStock);

// TODO 5 (local editor): make a broken object missing 'category'
// const broken: Product = { name: "Keyboard", price: 500000, inStock: true };
// → tsc: Property 'category' is missing
