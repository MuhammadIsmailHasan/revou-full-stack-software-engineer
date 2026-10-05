
// In your real .tsx: 
interface Product { 
    id: number; 
    name: string; 
    price: number; 
    stock: number;
    sale: boolean; 
}

function getStockBadgeClasses(stock: number) {
    const base = "text-xs px-2 py-1 rounded-full font-medium";
    if (stock > 0) {
        return base + " bg-green-100 text-green-700";
    }

    return base + " bg-red-100 text-red-700";
}

function getButtonClasses(inStock: boolean) {
    const base = "px-4 py-2 rounded font-medium w-full mt-3";
    return inStock ? 
        base + " bg-blue-500 text-white hover:bg-blue-700" :
        base + " bg-gray-300 text-white";
}

function cn(...classes: (string | false | null | undefined)[]): string {
    return classes.filter(Boolean).join(""); 
}

export function ProductCardHands2({ product }: { product: Product }) {
    const inStock = product.stock > 0;

    return (
            <div className={cn(
                "border rounded-lg p-4 w-56",
                inStock ? "border-gray-100" : "border-red-400 opacity-50"
            )}>

                <div className="bg-gray-800 h-20 flex items-center justify-center rounded mb-3">img</div>
                <h3 className="font-bold">
                    {product.name}
                    {product.sale && <span className="ml-2 text-xs text-pink-500">Sale</span>}
                </h3>
                <p className="mb-2">Rp {product.price.toLocaleString("id-ID")}</p>

                <span className={getStockBadgeClasses(product.stock)}>
                    {inStock ? "In Stock" : "Out of Stock"}
                </span>
                

                <div className="mt-3">
                    {/* TODO 4: disabled when !inStock; label "Add to Cart" / "Unavailable" */}
                    <button disabled={!inStock} className={getButtonClasses(inStock)}>{inStock ? "Add to Cart" : "Unavailable"}</button>
                </div>
            </div>
    );
}