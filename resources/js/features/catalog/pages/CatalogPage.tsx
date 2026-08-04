import PublicLayout from "@/layouts/PublicLayout";
import Toolbar from "../components/Toolbar";
import ProductGrid from "../components/ProductGrid";
import { Products } from "../data/Products";
import ProductFilter from "../components/ProductFilter";

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
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    <div>
                        <ProductFilter />
                    </div>

                    <div className="lg:col-span-3">
                        <Toolbar />
                        <ProductGrid products={Products} />
                        {/* <div className="rounded-xl border border-[var(--color-border)] p-8 text-center">
                            Product Grid (Coming Soon)
                        </div> */}
                    </div>

                </div>


            </div>
        </PublicLayout>
    );
}

