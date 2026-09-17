// HANDS-ON 3 — Wire up click, input, and submit events.

const products = [
	{ name: "Laptop", price: "Rp 15.000.000" },
	{ name: "Mouse", price: "Rp 250.000" },
	{ name: "Keyboard", price: "Rp 750.000" },
];

const grid = document.getElementById("product-grid");

// Reusable helper: build one card and append it
function addCard(product) {
	const card = document.createElement("div");
	card.className = "card";
	card.innerHTML = `<h3>${product.name}</h3><p class="price">${product.price}</p>`;
	grid.appendChild(card);
}

// Render the initial cards
products.forEach(addCard);

// TODO 1: CLICK — add a sample card each time #add-btn is clicked
const addBtn = document.getElementById("add-btn");

addBtn.addEventListener("click", () => {
	addCard({
		name: "Sample Name",
		price: "Rp. 1.000.000",
	});
});

// TODO 2: INPUT — filter visible cards live as the user types in #filter
const filter = document.getElementById("filter");
// filter.addEventListener('input', (event) => {
//   const term = event.target.value.toLowerCase();
//   document.querySelectorAll('.card').forEach((card) => {
//     const name = card.querySelector('h3').textContent.toLowerCase();
//     card.style.display = name.includes(term) ? '' : 'none';
//   });
// });

filter.addEventListener("input", (event) => {
	const inputText = event.target.value.toLowerCase();
	document.querySelectorAll(".card").forEach((card) => {
		const productName = card.querySelector("h3").textContent.toLowerCase();
		card.style.display = productName.includes(inputText) ? "" : "none";
	});
});

// TODO 3: SUBMIT — preventDefault, read values, log them, add a card
const form = document.getElementById("product-form");

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const newProduct = {
		name: form.name.value,
		price: form.price.value,
	};
	addCard(newProduct);
	console.log(
		`Success add new product: ${newProduct.name}, ${newProduct.price}`,
	);
	form.reset();
});
