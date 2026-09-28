import Image from "next/image";

const products = [
    { id: 1, name: "Product A", price: 120000, img: "https://beritanasionalupdate.com/upload/news/1858696975729376.png"},
    { id: 2, name: "Product B", price: 85000, img: "https://beritanasionalupdate.com/upload/news/1858696975729376.png"},
    { id: 3, name: "Product C", price: 200000, img: "https://beritanasionalupdate.com/upload/news/1858696975729376.png"},
];

function ProductCard({name, price, image} : {name:string, price: number, image:string}) {
    return (
        <div className="border border-gray-700 rounded-lg p-4">
            <Image
                className="border border-gray-500 mb-4 rounded-lg w-full h-auto"
                src={image}
                alt={name}
                width={500}
                height={500}
                unoptimized
            />
            <h3>{name}</h3>
            <p>{price.toLocaleString('id-ID')}</p>
        </div>
    )
}

export default function ProductGrid() {
    return (
        <section className="grid grid-cols-3 gap-4 my-4">
            {products.map((p) => (
                <ProductCard key={p.id} name={p.name} price={p.price} image={p.img}></ProductCard>
            ))}
        </section>
    )
}