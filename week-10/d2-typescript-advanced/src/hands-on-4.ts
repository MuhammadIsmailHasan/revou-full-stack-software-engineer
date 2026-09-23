// ============================================================
// Typed Order System — add ALL the interfaces, aliases & annotations.
// On your machine: tsc must compile with ZERO errors before submitting.
// ============================================================

// TODO 1: aliases
type ID = string | number;
type OrderStatus = "pending" | "paid" | "shipped" | "cancelled";

// TODO 2: Product (readonly id, required fields, optional discount)
interface Product {
	readonly id: number;
	name: string;
	price: number;
	discount?: number;
}

// TODO 3: Order (readonly orderId, customerId: ID, items: Product[], status, total, couponCode?)
interface Order {
	readonly orderId: string;
	customerId: ID;
	items: Product[];
	status: OrderStatus;
	total: number;
	couponCode?: string;
}

// TODO 4: a catalogue of products
const catalogue: Product[] = [
	{ id: 1, name: "Laptop", price: 15000000, discount: 10 },
	{ id: 2, name: "Mouse", price: 200000 },
	{ id: 3, name: "Keyboard", price: 500000, discount: 20 },
];

// TODO 5: two orders with different statuses
const orderA: Order = {
	orderId: "ORD-001",
	customerId: "CUST-7",
	items: [catalogue[0]!, catalogue[1]!],
	status: "paid",
	couponCode: "SAVE10",
	total: cartTotal([catalogue[0]!, catalogue[1]!]),
};

const orderB: Order = {
	orderId: "ORD-002",
	customerId: 42,
	items: [catalogue[2]!],
	status: "pending",
	total: 0,
};

// TODO 6: lineTotal — applies the optional discount
function lineTotal(p: Product) {
	const off = p.discount ? p.price * (p.discount / 100) : 0;
	return p.price - off;
}

// TODO 7: cartTotal — sums line totals, returns a number
function cartTotal(items: Product[]) {
	return items.reduce((sum, p) => sum + lineTotal(p), 0);
}

// TODO 8: summarise — returns a string
function summarise(o: Order) {
	return (
		o.orderId +
		" [" +
		o.status +
		"] — " +
		o.items.length +
		" item(s), Rp " +
		o.total.toLocaleString("id-ID") +
		(o.couponCode ? " (" + o.couponCode + ")" : "")
	);
}

orderA.total = cartTotal(orderA.items);
orderB.total = cartTotal(orderB.items);

console.log(summarise(orderA));
console.log(summarise(orderB));

// TODO 9: prove the return types
console.log(
	"Type check →",
	typeof cartTotal(catalogue), // "number"
	typeof summarise(orderA), // "string"
);
