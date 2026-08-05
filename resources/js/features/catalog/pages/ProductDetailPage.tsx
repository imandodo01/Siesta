import PublicLayout from "@/layouts/PublicLayout";
import { Product } from "../types/Product";
import Breadcrumb from "@/components/Breadcrumb";
import ProductGrid from "../components/ProductGrid";

type Props = {
    product: Product;
    relatedProducts: Product[];
};

export default function ProductDetailPage({
    product,
    relatedProducts,
}: Props) {
    console.log(product);
    return (
        <PublicLayout>
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "Products", href: "/products" },
                    { label: product.name },
                ]}
            />
            <div className="grid gap-10 lg:grid-cols-2">

                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full rounded-xl border"
                />

                <div className="space-y-6">

                    <h1 className="text-4xl font-bold">
                        {product.name}
                    </h1>

                    <p className="text-3xl font-bold text-amber-600">
                        Rp {product.price.toLocaleString("id-ID")}
                    </p>

                    <p className="text-gray-600">
                        {product.description}
                    </p>

                </div>

            </div>
            <section className="mt-16">
                <h2 className="mb-6 text-2xl font-bold">
                    Related Products
                </h2>

                <ProductGrid products={relatedProducts} />
            </section>
        </PublicLayout>
    );
}
