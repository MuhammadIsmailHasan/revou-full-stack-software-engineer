export default function ProductsLayout({ children } : { children: React.ReactNode; }) {
    return (
        <div>
            <p className="px-6 pt-3 text-sm text-gray-500">RevoShop › Products</p>
            {children}
        </div>
    );
}
