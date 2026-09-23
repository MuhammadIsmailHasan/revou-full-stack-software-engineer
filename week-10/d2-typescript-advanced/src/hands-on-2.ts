// ============================================================
// Hands-On 2: Constrain a function with union types.
// Valid values run; invalid values are compile errors in tsc.
// ============================================================

// TODO 1: a string-literal union — only these three are allowed
type PaymentMethod = "cash" | "credit_card" | "transfer";

// TODO 2: a primitive union — either a string or a number
type ID = string | number;

// TODO 3: use BOTH unions in one signature
function payOrder(id: ID, method: PaymentMethod) {
	return "Order " + id + " paid by " + method;
}

// TODO 4: three VALID calls
console.log(payOrder(1001, "cash")); // numeric id
console.log(payOrder("ORD-7", "transfer")); // string id
console.log(payOrder("ORD-9", "credit_card"));

// TODO 5 (local editor): these are COMPILE errors — try them with tsc
// payOrder(7, "paypal");
//             ~~~~~~~~ '"paypal"' is not assignable to type 'PaymentMethod'
// payOrder(true, "cash");
//          ~~~~ 'boolean' is not assignable to type 'ID'
