import { Product } from "@/features/catalog/types/Product";
import PublicLayout from "@/layouts/PublicLayout";
import ProductGrid from "@/features/catalog/components/ProductGrid";

type Props = {
    featuredProducts: Product[];
    newArrivals: Product[];
};

export default function HomePage({ featuredProducts, newArrivals }: Props) {
    return (
        <PublicLayout>
            <section className="py-24 text-center">

                <h1 className="text-6xl font-bold">
                    Commerce without noise.
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
                    A production-inspired commerce platform focused on thoughtful shopping.
                </p>

            </section>
            <section className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold">
                        Featured Products
                    </h2>
                    <p className="text-gray-600">
                        Hand-picked products from Siesta.
                    </p>
                </div>
                <ProductGrid
                    products={featuredProducts}
                />
            </section>
            <section className="space-y-6 mt-8">
                <div>
                    <h2 className="text-3xl font-bold">
                        New Arrivals
                    </h2>
                    <p className="text-gray-600">
                        Check out our latest additions.
                    </p>
                </div>
                <ProductGrid
                    products={newArrivals}
                />
            </section>
        </PublicLayout>
    );
}
