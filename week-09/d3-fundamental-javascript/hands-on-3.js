// HANDS-ON 3 — A pure-function invoice calculator. No DOM, console only.
// Each function does ONE job and RETURNS a value. Chain them together.

// TODO 1: subtotal = price * quantity
const subtotal = (price, quantity) => {
	return price * quantity;
};

// TODO 2: tax = amount * rate   (rate 0.11 = 11%)
const tax = (amount, rate) => {
	return amount * rate;
};

// TODO 3: discount = amount * (percent / 100)
const discount = (amount, percent) => {
	return amount * (percent / 100);
};

// TODO 4: grandTotal = sub + taxAmount - discountAmount
const grandTotal = (sub, taxAmount, discountAmount) => {
	return sub + taxAmount - discountAmount;
};

// TODO 5: CHAIN the return values together
const sub = subtotal(50000, 3); // price 50.000 x qty 3
const taxAmount = tax(sub, 0.11);
const discAmount = discount(sub, 10);
const grand = grandTotal(sub, taxAmount, discAmount);

// TODO 6: Log every step so you can SEE the chain
console.log("Subtotal:", sub);
console.log("Tax (11%):", taxAmount);
console.log("Discount (10%):", discAmount);
console.log("GRAND TOTAL:", grand);

// Bonus: format it nicely
console.log("Total: Rp " + grand.toLocaleString("id-ID"));
