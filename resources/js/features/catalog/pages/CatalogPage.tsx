import PublicLayout from "@/layouts/PublicLayout";
import Toolbar from "../components/Toolbar";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import ProductFilter from "../components/ProductFilter";
import useCatalog from "../hooks/useCatalog";
import { Product } from "../types/Product";
import { router } from "@inertiajs/react";

type PaginationMeta = {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
};

type Props = {
    products: {
        data: Product[];
        meta: PaginationMeta;
    };
    categories: { name: string; slug: string }[];
    selectedCategory?: string;
};

export default function CatalogPage({
    products,
    categories,
    selectedCategory,
}: Props) {

    const {
        filteredProducts,
        search,
        category,
        sort,
        setSearch,
        setCategory,
        setSort,
    } = useCatalog(products.data, selectedCategory || "All");

    const changeCategory = (value: string) => {
        setCategory(value);
        router.get(route("products"), value === "All" ? {} : { category: value }, { preserveScroll: true });
    };

    return (
        <PublicLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-bold">
                        Products
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Browse our collection.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    <div>
                        <ProductFilter />
                    </div>

                    <div className="lg:col-span-3">
                        <Toolbar
                            search={search}
                            category={category}
                            sort={sort}
                            onSearchChange={setSearch}
                            categories={categories}
                            onCategoryChange={changeCategory}
                            onSortChange={setSort}
                        />
                        {filteredProducts.length === 0 ? (
                            <div className="rounded-xl border border-dashed p-16 text-center">
                                No products found.
                            </div>
                        ) : (
                            <ProductGrid products={filteredProducts} />
                        )}
                        <Pagination
                            currentPage={products.meta.currentPage}
                            lastPage={products.meta.lastPage}
                        />
                    </div>

                </div>


            </div>
        </PublicLayout>
    );
}
