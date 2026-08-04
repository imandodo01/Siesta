import { products } from "../../data/Products";

export default function CategoryFilter({ value, onChange }: { value: string; onChange: (value: string) => void }) {

    const categories = [
        "All",
        ...new Set(products.map((product) => product.category)),
    ];

    return (
        <select
            className="rounded-xl border border-[var(--color-border)] bg-white px-4 py-2"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {categories.map((category) => (
                <option key={category} value={category}>
                    {category}
                </option>
            ))}
        </select>
    );
}
