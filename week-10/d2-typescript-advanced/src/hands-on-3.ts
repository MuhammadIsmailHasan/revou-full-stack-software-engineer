// ============================================================
// Hands-On 3: One interface combining EVERYTHING:
// required, optional (?), readonly, a union status, and Product[].
// ============================================================

// TODO 1: Product (readonly id, required fields, optional discount)
interface Product {
	readonly id: number;
	name: string;
	price: number;
	discount?: number;
}

// TODO 2: the union status
type OrderStatus = "pending" | "paid" | "shipped" | "cancelled";

// TODO 3: the Order interface
interface Order {
	readonly orderId: string;
	status: OrderStatus;
	items: Product[];
	total: number;
	couponCode?: string;
	note?: string;
}

// TODO 4: three sample orders
const order1: Order = {
	orderId: "ORD-001",
	status: "pending",
	items: [{ id: 1, name: "Laptop", price: 15000000 }],
	total: 15000000,
};

const order2: Order = {
	orderId: "ORD-002",
	status: "paid",
	items: [
		{ id: 2, name: "Mouse", price: 200000, discount: 10 },
		{ id: 3, name: "Keyboard", price: 500000 },
	],
	total: 700000,
	couponCode: "SAVE10",
};

const order3: Order = {
	orderId: "ORD-003",
	status: "shipped",
	items: [{ id: 4, name: "Monitor", price: 3000000 }],
	total: 3000000,
	couponCode: "FREESHIP",
	note: "Leave at front desk",
};

function summarise(o: Order) {
	return (
		o.orderId +
		" [" +
		o.status +
		"] — " +
		o.items.length +
		" item(s), Rp " +
		o.total.toLocaleString("id-ID") +
		(o.couponCode ? " (coupon: " + o.couponCode + ")" : "")
	);
}

console.log(summarise(order1));
console.log(summarise(order2));
console.log(summarise(order3));

// TODO 5 (local editor): try each of these and run tsc —
// status: "refunded"        → not assignable to type 'OrderStatus'
// (drop 'total')            → Property 'total' is missing
// order1.orderId = "X"      → Cannot assign to 'orderId' (read-only)
// items: ["not a product"]  → 'string' is not assignable to type 'Product'
