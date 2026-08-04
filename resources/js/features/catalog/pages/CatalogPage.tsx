import PublicLayout from "@/layouts/PublicLayout";
import ProductCard from "../components/ProductCard";

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
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

                    <ProductCard
                        name="Coffee Beans"
                        price={125000}
                        image="https://picsum.photos/400"
                    />

                </div>

            </div>
        </PublicLayout>
    );
}

