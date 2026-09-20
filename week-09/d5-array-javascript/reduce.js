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

// 0 is initial value
// wajib return
const totalPrice = products.reduce((accumulator, item) => {
	return accumulator + item.price;
}, 0);
console.log("total price: ", totalPrice);

const howItsRun = products.reduce((accumulator, item, index, allItems) => {
	console.log("accumulator: ", accumulator);
	console.log("index: ", index);
	// console.log("item: ", item);
	// console.log("all: ", allItems);
	// accumulator + index;

	const jumlah = accumulator + index;
	console.log("current accumulator: ", jumlah);
	console.log("=============");
	return jumlah;
}, 1);

console.log("hasilnya: ", howItsRun);
