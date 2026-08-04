import { Product } from "../../types/Product";

type ProductCardProps = {
    product: Product;
};

export default function ProductCard({
    product,
}: ProductCardProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white transition-shadow hover:shadow-md">

            <img
                src={product.image}
                alt={product.name}
                className="aspect-square w-full object-cover"
            />

            <div className="space-y-2 p-4">

                <h3 className="font-semibold">
                    {product.name}
                </h3>

                <p className="text-lg font-bold text-amber-600">
                    Rp {product.price.toLocaleString("id-ID")}
                </p>

            </div>

        </div>
    );
}
