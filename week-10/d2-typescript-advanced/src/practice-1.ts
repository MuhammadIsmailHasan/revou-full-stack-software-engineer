type status = "active" | "non_active";
type orderStatus = "pending" | "paid" | "processing" | "shipped" | "delivered";

interface Customer {
	readonly id: number;
	name: string;
	status: status;
}

interface Product {
	readonly id: number;
	name: string;
	price: number;
	sku: string;
	description?: string;
	status: status;
}

interface Cart {
	readonly id: number;
	customerId: Customer;
	product: Product[];
	quantity: number;
	price_ordered: number;
	couponCode?: string;
}

interface Order {
	readonly id: number;
	cart?: Cart;
	totalPrice: number;
	orderStatus: orderStatus;
	product: Array<Product>;
}

// function checkOut(cart: Cart): Order {
// 	return Order;
// }
