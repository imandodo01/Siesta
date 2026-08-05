import PublicLayout from "@/layouts/PublicLayout";
import Toolbar from "../components/Toolbar";
import ProductGrid from "../components/ProductGrid";
import ProductFilter from "../components/ProductFilter";
import useCatalog from "../hooks/useCatalog";
import { Product } from "../types/Product";

type Props = {
    products: Product[];
};

export default function CatalogPage({
    products,
}: Props) {

    const {
        filteredProducts,
        search,
        category,
        sort,
        setSearch,
        setCategory,
        setSort,
    } = useCatalog(products);

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
                            onCategoryChange={setCategory}
                            onSortChange={setSort}
                        />
                        {filteredProducts.length === 0 ? (
                            <div className="rounded-xl border border-dashed p-16 text-center">
                                No products found.
                            </div>
                        ) : (
                            <ProductGrid products={filteredProducts} />
                        )}
                    </div>

                </div>


            </div>
        </PublicLayout>
    );
}

