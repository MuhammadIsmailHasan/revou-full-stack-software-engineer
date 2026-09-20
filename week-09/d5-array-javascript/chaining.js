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

const totalExistingValue = products
	.filter((product) => product.inStock)
	.map((product) => product.price)
	.reduce((total, productPrice) => total + productPrice, 0);

const totalSale = products
	.filter((product) => product.inStock && product.onSale)
	.map((product) => product.price * (1 - product.discount))
	.reduce((total, priceDiscout) => total + priceDiscout, 0);

console.log(
	"total value of existing product: Rp. ",
	totalExistingValue.toLocaleString("id-ID"),
);

console.log("total sale: Rp. ", totalSale.toLocaleString("id-ID"));
