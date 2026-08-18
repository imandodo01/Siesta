type Category = { name: string; slug: string };

export default function CategoryFilter({ value, onChange, categories }: { value: string; onChange: (value: string) => void; categories: Category[] }) {

    return (
        <select
            className="rounded-xl border border-[var(--color-border)] bg-white px-4 py-2"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="All">All Products</option>
            {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                    {category.name}
                </option>
            ))}
        </select>
    );
}
