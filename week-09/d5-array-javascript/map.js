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

const names = products.map((product) => product.name);
console.log(names);

const priceTag = products.map(
	(product) => `Rp ${product.price.toLocaleString("id-ID")}`,
);
console.log(priceTag);

// PENTING
// JIKA SETELAH => {}, maka ini dianggap function body, jika ingin RETURN maka harus di tulis explisit
// JIKA SETELAH => tidak ada {}, maka code setelahnya akan di return

const addIndex = products.map((product) => ({ ...product, newPrice: 1000 }));
const addIndex2 = products.map((product) => {
	return { ...product, newPrice: 1000 };
});
console.log(addIndex);
console.log("=======");
console.log(addIndex2);
