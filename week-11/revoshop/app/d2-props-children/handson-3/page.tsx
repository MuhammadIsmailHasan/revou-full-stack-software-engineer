import { Footer } from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { PageSection } from "./components/PageSection";
import { ProductCard } from "./components/Product";

export default function App() {
    return (
        <main className="p-4">
            <Header></Header>
            <PageSection title="List of Products">
                <ProductCard></ProductCard>
            </PageSection>
            <Footer></Footer>
        </main>
    );
}