import PublicLayout from "@/layouts/PublicLayout";
import { Product } from "../types/Product";
import Breadcrumb from "@/components/Breadcrumb";
import ProductGrid from "../components/ProductGrid";
import Button from "@/components/Button/Button";
import { Link } from "@inertiajs/react";

import { useCart } from "@/features/cart/context/CartContext";

type Props = {
    product: Product;
    relatedProducts: Product[];
};

export default function ProductDetailPage({
    product,
    relatedProducts,
}: Props) {
    const { addItem } = useCart();
    const formattedPrice = `Rp ${product.price.toLocaleString("id-ID")}`;
    const isInStock = product.stock > 0;

    return (
        <PublicLayout>
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "Products", href: "/products" },
                    { label: product.name },
                ]}
            />

            <div className="grid gap-10 py-8 lg:grid-cols-2">
                <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white p-3 shadow-sm">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="aspect-[4/5] w-full rounded-2xl object-cover"
                    />
                </div>

                <div className="space-y-6">
                    <div className="space-y-3">
                        <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                            {product.category}
                        </span>
                        <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text)]">
                            {product.name}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <p className="text-3xl font-bold text-amber-600">
                            {formattedPrice}
                        </p>
                        <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                isInStock
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {isInStock ? "In stock" : "Out of stock"}
                        </span>
                    </div>

                    <p className="text-lg leading-8 text-gray-600">
                        {product.description}
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Button
                            className="flex-1 justify-center sm:flex-none"
                            onClick={() => addItem(product)}
                            disabled={!isInStock}
                        >
                            {isInStock ? "Add to Cart" : "Out of Stock"}
                        </Button>
                        <Link href="/products">
                            <Button variant="outline" className="w-full sm:w-auto">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>

                    <div className="rounded-2xl border border-[var(--color-border)] bg-stone-50 p-5">
                        <dl className="grid gap-4 text-sm text-gray-600 sm:grid-cols-2">
                            <div>
                                <dt className="font-medium text-[var(--color-text)]">SKU</dt>
                                <dd className="mt-1">{product.sku}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-[var(--color-text)]">Availability</dt>
                                <dd className="mt-1">{product.stock} units left</dd>
                            </div>
                        </dl>
                    </div>
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
