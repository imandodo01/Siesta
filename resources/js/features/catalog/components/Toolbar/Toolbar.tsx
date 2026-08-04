import SearchBar from "../SearchBar";
import CategoryFilter from "../CategoryFilter";
import SortDropdown from "../SortDropdown";

export default function Toolbar() {
    return (
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <SearchBar />

            <div className="flex gap-4">
                <CategoryFilter />
                <SortDropdown />
            </div>
        </div>
    );
}
