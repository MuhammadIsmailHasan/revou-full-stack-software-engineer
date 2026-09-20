// HANDS-ON 2 — Build the chain ONE step at a time, then combine.

const products = [
	{
		name: "Laptop",
		price: 15000000,
		category: "Electronics",
		inStock: true,
		onSale: true,
		discount: 0.1,
	},
	{
		name: "Mouse",
		price: 250000,
		category: "Accessories",
		inStock: true,
		onSale: false,
		discount: 0,
	},
	{
		name: "Keyboard",
		price: 750000,
		category: "Accessories",
		inStock: false,
		onSale: true,
		discount: 0.2,
	},
	{
		name: "Monitor",
		price: 3000000,
		category: "Electronics",
		inStock: true,
		onSale: true,
		discount: 0.15,
	},
	{
		name: "Webcam",
		price: 500000,
		category: "Accessories",
		inStock: false,
		onSale: false,
		discount: 0,
	},
];

const rupiah = (n) => "Rp " + Math.round(n).toLocaleString("id-ID");

// TODO 1: filter — keep in-stock AND on-sale items
const salesItems = products.filter((p) => p.inStock && p.onSale);
document.getElementById("step-filter").textContent = salesItems
	.map((p) => p.name)
	.join(", ");

// TODO 2: map — each surviving item → its discounted price
const saleDiscount = salesItems.map((p) => p.price * (1 - p.discount));
document.getElementById("step-map").textContent = saleDiscount
	.map(rupiah)
	.join(" , ");

// TODO 3: reduce — sum the discounted prices into one total
const totalSale = saleDiscount.reduce((sum, n) => sum + n, 0);
document.getElementById("step-reduce").textContent = rupiah(totalSale);

// TODO 4: CHAIN — the same result in a single expression
const chained = products
	.filter((p) => p.inStock && p.onSale)
	.map((p) => p.price * (1 - p.discount))
	.reduce((sum, n) => sum + n, 0);
document.getElementById("step-chain").textContent = rupiah(chained);
