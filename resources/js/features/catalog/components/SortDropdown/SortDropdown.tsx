export default function SortDropdown() {
    return (
        <select className="rounded-xl border border-[var(--color-border)] bg-white px-4 py-2">
            <option>Newest</option>
            <option>Price ↑</option>
            <option>Price ↓</option>
            <option>Name A-Z</option>
        </select>
    );
}
