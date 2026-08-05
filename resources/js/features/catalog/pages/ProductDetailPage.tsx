import PublicLayout from "@/layouts/PublicLayout";
import { Product } from "../types/Product";

type Props = {
    product: Product;
};

export default function ProductDetailPage({
    product,
}: Props) {
    return (
        <PublicLayout>
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
        </PublicLayout>
    );
}
