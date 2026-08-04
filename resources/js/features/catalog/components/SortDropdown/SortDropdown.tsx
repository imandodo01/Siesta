export default function SortDropdown({ value, onChange }: { value: string; onChange: (value: string) => void }) {
    return (
        <select
            className="rounded-xl border border-[var(--color-border)] bg-white px-4 py-2"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            >
            <option>Newest</option>
            <option>Price ↑</option>
            <option>Price ↓</option>
            <option>Name A-Z</option>
        </select>
    );
}
