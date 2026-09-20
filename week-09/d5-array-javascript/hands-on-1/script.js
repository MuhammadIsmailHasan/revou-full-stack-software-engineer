// HANDS-ON 1 — One product array, four methods.

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

// TODO 1: map — extract just the names, then show them
const names = products.map((product) => product.name);
document.getElementById("names").textContent = names.join(", ");

// TODO 2: filter — keep only in-stock products, then show the count

const productInStock = products.filter((product) => product.inStock);
document.getElementById("count").textContent = productInStock.length;

// TODO 3: reduce — sum every price into a single total
// const total = products.reduce((sum, p) => sum + p.price, 0);
// document.getElementById('total').textContent = 'Rp ' + total.toLocaleString('id-ID');

const total = products.reduce((total, product) => {
	return total + product.price;
}, 0);
document.getElementById("total").textContent =
	"Rp " + total.toLocaleString("id-ID");

// TODO 4: forEach — render one card per in-stock product);
const grid = document.getElementById("grid");
productInStock.forEach((product) => {
	const card = document.createElement("div");
	card.classList.add("card");
	card.innerHTML = `
        <h3>${product.name}</h3>
        <p class="cat">${product.category}</p>
        <p class="price">Rp. ${product.price.toLocaleString("id-ID")}</p>
    `;
	grid.appendChild(card);
});
