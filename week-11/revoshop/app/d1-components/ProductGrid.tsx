import Image from "next/image";

interface Product {
    id: number,
    name: string,
    price: number, 
    img: string,
    in_stock: "in-stock" | "out-of-stock",
    currency?: string,
    featured?: boolean
}

interface BadgeProps {
    variant: "in-stock" | "out-of-stock";
}

interface ProductCardProps {
    product: Product,
    currency?: string,
    featured?: boolean
}

const products: Product[] = [
    { id: 1, name: "Product A", price: 120000, img: "https://beritanasionalupdate.com/upload/news/1858696975729376.png", in_stock: "in-stock", currency: 'Rp', featured: true},
    { id: 2, name: "Product B", price: 85000, img: "https://beritanasionalupdate.com/upload/news/1858696975729376.png", in_stock: "out-of-stock", featured: false},
    { id: 3, name: "Product C", price: 200000, img: "https://beritanasionalupdate.com/upload/news/1858696975729376.png", in_stock: "in-stock", featured: true},
];

function Badge({variant} : BadgeProps) {
    const classes = variant === 'in-stock' ? 'bg-green-100 text-gren-400' : 'bg-red-100 text-red-400';

    return <span className={"text-xs px-2 py-1 rounded-full " + classes}>{variant}</span>
}

function ProductCard({product, currency, featured}: ProductCardProps) {
    return (
        <div className={`border border-gray-700 rounded-lg p-4 ${product.featured ? "ring-2 ring-blue-500" : "ring-2 ring-red-500"}`}>
            <Image
                className="border border-gray-500 mb-4 rounded-lg w-full h-auto"
                src={product.img}
                alt={product.name}
                width={500}
                height={500}
                unoptimized
            />
            <h3 className="font-bold">{product.name}</h3>
            <p className="mb-2">{ currency ?? product.currency} {product.price.toLocaleString('id-ID')}</p>
            <Badge variant={product.in_stock}></Badge>
        </div>
    )
}

export default function ProductGrid() {
    return (
        <section className="grid grid-cols-3 gap-4 my-4">
            {products.map((p) => (
                <ProductCard key={p.id} product={p} currency={p.id == 2 ? "US" : p.currency} featured={p.id == 3 ? false : p.featured}></ProductCard>
            ))}
        </section>
    )
}