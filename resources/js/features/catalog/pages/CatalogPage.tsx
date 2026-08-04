import PublicLayout from "@/layouts/PublicLayout";
import ProductCard from "../components/ProductCard";
import ProductGrid from "../components/ProductGrid";
import { Products } from "../data/Products";

export default function CatalogPage() {
    return (
        <PublicLayout>
            <div className="space-y-8">

                <div>
                    <h1 className="text-4xl font-bold">
                        Products
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Browse our collection.
                    </p>
                </div>

                {/* <div className="rounded-xl border border-[var(--color-border)] p-8 text-center">
                    Product Grid (Coming Soon)
                </div> */}
                <ProductGrid products={Products} />

            </div>
        </PublicLayout>
    );
}

