// 1) Model one order item (all the right types)
const item = {
	name: "Laptop",
	price: 15000000,
	quantity: 1,
	tags: ["electronics", "sale"],
};

const items = [
	{ name: "Laptop", price: 15000000, quantity: 1 },
	{ name: "Handphone", price: 10000000, quantity: 2 },
	{ name: "Earphone", price: 1300000, quantity: 5 },
];

// 2) formatPrice — ARROW function → returns a Rupiah STRING
const formatPrice = (price) => {
	return "Rp " + price.toLocaleString("id-ID");
};

// 3) subtotal — FUNCTION DECLARATION → price * quantity
function subtotal(price, quantity) {
	return price * quantity;
}

const subTotalObject = (item) => item.price * item.quantity;
const calculateTotalItems = (items) =>
	items.reduce((sum, item) => sum + subTotalObject(item), 0);

// 4) calculateTax(amount, rate) and calculateDiscount(amount, percent) — pure
const calculateTax = (amount, rate) => amount * rate;
const calculateDiscount = (amount, percent) => amount * (percent / 100);

// 5) grandTotal(sub, tax, discount) → sub + tax - discount
const grandTotal = (sub, tax, discount) => sub + tax - discount;

// 6) CHAIN the return values and log every step
const sub = subtotal(item.price, item.quantity);
const tax = calculateTax(sub, 0.11);
const disc = calculateDiscount(sub, 5);
const grand = grandTotal(sub, tax, disc);
console.log("Subtotal:", formatPrice(sub));
console.log("Tax:", formatPrice(tax));
console.log("Discount:", formatPrice(disc));
console.log("GRAND TOTAL:", formatPrice(grand));

const totalItems = calculateTotalItems(items);
console.log(`99. Total items: ${formatPrice(totalItems)}`);

// 7) Ternary: free shipping over 10,000,000
console.log(grand > 10000000 ? "Free shipping!" : "Add more for free shipping");
