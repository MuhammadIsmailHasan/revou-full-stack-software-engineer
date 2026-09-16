// HANDS-ON 2 — Three pricing functions. Mix both syntaxes.

// TODO 1: formatPrice — ARROW function returning a Rupiah STRING
//   Hint: price.toLocaleString('id-ID') turns 15000000 into "15.000.000"
const formatPrice = (price, formatter) => {
	return "Rp " + price.toLocaleString(formatter);
};

// TODO 2: calculateDiscount — FUNCTION DECLARATION returning a NUMBER
//   discount amount = price * (percent / 100)
function calculateDiscount(price, percent) {
	return price * (percent / 100);
}

// TODO 3: isAffordable — returns a BOOLEAN using a comparison operator
const isAffordable = (price, budget) => {
	return price <= budget;
};

// TODO 4: Test each function
const price = 15000000;
console.log("Formatted:", formatPrice(price, "id-ID")); // "Rp 15.000.000"
console.log("Formatted:", formatPrice(price, "us-US")); // "Rp 15,000,000"
console.log("Discount (20%):", calculateDiscount(price, 20)); // 3000000
console.log("Affordable on 10M?", isAffordable(price, 10000000)); // false

// TODO 5: Use a ternary on the boolean
const message = isAffordable(price, 20000000) ? "Buy it!" : "Save more";
console.log(message);

// TODO 6: Confirm the return TYPES
console.log(
	typeof formatPrice(price),
	typeof calculateDiscount(price, 20),
	typeof isAffordable(price, 10000000),
);
