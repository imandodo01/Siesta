export default function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
    return (
        <input
            type="text"
            placeholder="Search products..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500 md:w-80"
        />
    );
}
