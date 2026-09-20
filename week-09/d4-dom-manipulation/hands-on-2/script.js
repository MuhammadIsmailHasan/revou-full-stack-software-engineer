// HANDS-ON 2 — Generate all product cards from an array.

// TODO 1: Define the products array (add a 4th to test the loop!)
const products = [
	{ name: "Laptop", price: "Rp 15.000.000" },
	{ name: "Mouse", price: "Rp 250.000" },
	{ name: "Keyboard", price: "Rp 750.000" },
];

// TODO 2: Select the empty grid container
const grid = document.getElementById("product-grid");
console.log(grid);

// TODO 3: Loop over the array and build a card for each product
products.forEach((product) => {
	const card = document.createElement("div");
	card.className = "card";
	card.innerHTML = `
        <h3>${product.name}</h3>
        <p class='price'>${product.price}</p>
    `;
	grid.appendChild(card);
});
