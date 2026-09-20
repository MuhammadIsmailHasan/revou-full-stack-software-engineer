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

const inStock = products.filter((product) => product.inStock);
const expensive = products.filter((product) => product.price > 300000);

console.log(inStock);
console.log(expensive);
