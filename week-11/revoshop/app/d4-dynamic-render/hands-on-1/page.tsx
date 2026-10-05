import { useState } from "react";
import { ProductCard } from "./components/ProductCard";
import { ProductCardHands2 } from "./components/ProductCardHands2";
import { ProductCardHands3 } from "./components/ProductCardHands3";
// import { useState } from "react";

const products = [
    { id: 1, name: "Laptop Stand", price: 250000, stock: 8, sale: true },
    { id: 2, name: "Keyboard", price: 450000, stock: 0, sale: false },
    { id: 3, name: "Mouse", price: 450000, stock: 0, sale: true },
];

const product3 = [
    { id: 1, name: "Laptop Stand", price: 250000, stock: 8, sale: true },
    { id: 2, name: "Keyboard", price: 450000, stock: 0, sale: false },
    { id: 3, name: "Mouse", price: 20000, stock: 10, sale: true },
    { id: 4, name: "Monitor", price: 400000, stock: 20, sale: true },
    { id: 5, name: "RAM", price: 900000, stock: 31, sale: true },
    { id: 6, name: "SSD", price: 90000, stock: 2, sale: true },
];

export default function Day4() {
    const [query, setQuery] = useState("");
    const visible = product3.filter(p => p.name. toLocaleLowerCase().includes(query.toLowerCase()))

    return (

        <main className="p-4 grid gap-2">
            <h2 className="p-4 my-3">Hands On 1</h2>
            <div className="p-4 flex gap-4 flex-wrap">
                {
                    products.map(p => (<ProductCard key={p.id} product={p}></ProductCard>
                    ))
                }
            </div>
            
            <h2 className="p-4 my-3">Hands On 2</h2>
            <div className="p-4 flex gap-4 flex-wrap">
                {
                    products.map(p => (<ProductCardHands2 key={p.id} product={p}></ProductCardHands2>
                    ))
                }
            </div>

            <h2 className="p-4 my-3">Hands On 3</h2>
            <div className="p-4 flex gap-4 flex-wrap">
                {
                    product3.map(p => (<ProductCardHands3 key={p.id} product={p}></ProductCardHands3>
                    ))
                }
            </div>
        </main>
    )
}