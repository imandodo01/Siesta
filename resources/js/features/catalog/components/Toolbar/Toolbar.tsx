import SearchBar from "../SearchBar";
import CategoryFilter from "../CategoryFilter";
import SortDropdown from "../SortDropdown";

export default function Toolbar(
    { search,
    category,
    sort,
    onSearchChange,
    onCategoryChange,
    onSortChange }: {
        search: string;
        category: string;
        sort: string;
        onSearchChange: (value: string) => void;
        onCategoryChange: (value: string) => void;
        onSortChange: (value: string) => void;
    }
) {
    return (
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <SearchBar value={search} onChange={onSearchChange} />

            <div className="flex gap-4">
                <CategoryFilter value={category} onChange={onCategoryChange} />
                <SortDropdown value={sort} onChange={onSortChange} />
            </div>
        </div>
    );
}
