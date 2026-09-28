
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <main className="p-8">
      <Header></Header>
      <ProductGrid></ProductGrid>
      <Footer></Footer>
    </main>
  );
}
