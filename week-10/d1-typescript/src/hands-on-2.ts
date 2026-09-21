// ============================================================
// Rewrite last week's product variables WITH type annotations.
// Add the correct : type after each variable name.
// ============================================================

// TODO 1: annotate each variable with its primitive type
let productName: string = "MacBook Pro";     // should be : string
let price: number = 28000000;                // should be : number
let inStock: boolean = true;                  // should be : boolean

// TODO 2: add two more typed variables
let discountPercent: number = 10;
let category: string = "Laptops";

// TODO 3 (do this in your LOCAL editor): try a wrong type and see the red underline
// inStock = "yes";  // ❌ Type 'string' is not assignable to type 'boolean'

// TODO 4: format the price using a number method (autocomplete helps here)
const formattedPrice = "Rp " + price.toLocaleString("id-ID");

// TODO 5: build and log a one-line summary using your typed variables
console.log(`${productName} (${"category here"}) — ${formattedPrice}`);
console.log("In stock?", inStock);

function isAffortable(price: number) : boolean {
    return price < 1000000 ? true : false;
}
console.log(isAffortable(price));