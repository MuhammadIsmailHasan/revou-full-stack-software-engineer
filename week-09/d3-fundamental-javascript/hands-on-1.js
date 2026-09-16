// HANDS-ON 1 — Model a product with all five data types.
// Fill in each TODO, then click Run Code and read the console output.

// TODO 1: Create the product object.
const product = {
	name: "Laptop",
	price: 15000000,
	inStock: true,
	tags: ["electronics", "sale"],
};

// TODO 2: ACCESS each field and log it
console.log("Name:", product.name);
console.log("Price:", product.price);
console.log("In stock:", product.isStock);
console.log("Tags:", product.tags);

// TODO 3: UPDATE two fields (allowed even though product is const)
product.name = "Macbook";
product.price = 13500000;
product.inStock = false;
console.log("Updated product:", product);

// TODO 4: Access the FIRST tag in the array
console.log("First tag:", product.tags[3]);

// TODO 5: Confirm each type with typeof
console.log(
	typeof product.name,
	typeof product.price,
	typeof product.inStock,
	Array.isArray(product.tags),
);

// TODO 6: The coercion surprise — predict each result BEFORE running
console.log('"5" + 1 =', "5" + 1); // string concatenation?
console.log("5 + 1   =", 5 + 1); // real addition?
console.log("5 - 1 = ", "5" - 1);
console.log("10 / 2 = ", "10" / 2);
console.log("5 * 2 = ", "5" * 2);
