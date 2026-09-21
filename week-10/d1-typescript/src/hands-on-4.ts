// ============================================================
// Typed Order Summary Module — add ALL the type annotations.
// Every function needs parameter types AND a return type.
// On your machine: `tsc` must compile with ZERO errors.
// ============================================================

// TODO 1: typed constants
const TAX_RATE = 0.11;     // : number
const currency = "Rp";     // : string

// TODO 2: formatPrice — number → string
function formatPrice(price: number) : string {
    return currency + " " + price.toLocaleString("id-ID");
}

// TODO 3: subtotal — (number, number) → number
function subtotal(price: number, qty: number) : number {
  return price * qty;
}

// TODO 4: applyDiscount — (number, number) → number
const applyDiscount = (amount: number, percent: number) : number => {
  return amount - amount * (percent / 100);
};

// TODO 5: applyTax — number → number
const applyTax = (amount: number) : number => {
  return amount + amount * TAX_RATE;
};

// TODO 6: qualifiesForFreeShipping — number → boolean
const qualifiesForFreeShipping = (amount: number) : boolean => {
    return amount >= 10000000;
};

// TODO 7: printSummary — (string, string) → void  (returns nothing)
function printSummary(label: string, value: string) : void {
    console.log(label, value);
}

// --- Compose the order (fill in the calls) ---
const sub = subtotal(15000000, 2);          // 30000000
const discounted = applyDiscount(sub, 5);   // after 5% off
const grandTotal = applyTax(discounted);    // + 11% tax

printSummary("Subtotal:", formatPrice(sub));
printSummary("After discount:", formatPrice(discounted));
printSummary("Grand total:", formatPrice(grandTotal));
printSummary("Free shipping?", qualifiesForFreeShipping(sub) ? "Yes" : "No");

// TODO 8: prove the return types
console.log("Type check →",
  typeof formatPrice(sub),                 // "string"
  typeof subtotal(15000000, 2),            // "number"
  typeof qualifiesForFreeShipping(sub)     // "boolean"
);
