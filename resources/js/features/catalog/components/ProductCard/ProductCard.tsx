type ProductCardProps = {
    name: string;
    price: number;
    image: string;
};

export default function ProductCard({
    name,
    price,
    image,
}: ProductCardProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white transition-shadow hover:shadow-md">
            <img
                src={image}
                alt={name}
                className="aspect-square w-full object-cover"
            />

            <div className="space-y-2 p-4">
                <h3 className="font-semibold">
                    {name}
                </h3>

                <p className="text-lg font-bold text-amber-600">
                    Rp {price.toLocaleString("id-ID")}
                </p>
            </div>
        </div>
    );
}
