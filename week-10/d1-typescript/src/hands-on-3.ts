// ============================================================
// Rewrite Day-3's three functions WITH TypeScript types.
// Add parameter types and a return type to each one.
// On your machine: run `tsc` and fix every error before submitting.
// ============================================================

// TODO 1: formatPrice — takes a number, returns a STRING
function formatPrice(price: number) : string {
    return "Rp " + price.toLocaleString("id-ID");
}

// TODO 2: calculateDiscount — two numbers in, a NUMBER out
const calculateDiscount = (price: number , percent: number) : number => {
  return price * (percent / 100);
};

// TODO 3: isAffordable — two numbers in, a BOOLEAN out
const isAffordable = (price:number, budget: number) : boolean => {
    return price <= budget;
};

// TODO 4: logResult — returns nothing → annotate the return type as void
function logResult(label: string, value: string) : void {
    console.log(label + ": " + value);
}

// --- Test your typed functions ---
const price = 15000000;
console.log("Formatted:", formatPrice(price));                 // "Rp 15.000.000"
console.log("Discount (20%):", calculateDiscount(price, 20));  // 3000000
console.log("Affordable on 10M?", isAffordable(price, 10000000)); // false

// Prove the RETURN TYPES with typeof
console.log("Types →",
  typeof formatPrice(price),            // "string"
  typeof calculateDiscount(price, 20),  // "number"
  typeof isAffordable(price, 10000000)  // "boolean"
);

// TODO 5 (local editor): calculateDiscount("laptop", 20) → run tsc → read & fix the error
// console.log(calculateDiscount("tes", 20)); // Argument of type 'string' is not assignable to parameter of type 'number'.