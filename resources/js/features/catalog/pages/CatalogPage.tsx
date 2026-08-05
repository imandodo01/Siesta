import PublicLayout from "@/layouts/PublicLayout";
import Toolbar from "../components/Toolbar";
import ProductGrid from "../components/ProductGrid";
import ProductFilter from "../components/ProductFilter";
import useCatalog from "../hook/useCatalog";

export default function CatalogPage() {

    const {
        products,
        search,
        category,
        sort,
        setSearch,
        setCategory,
        setSort,
    } = useCatalog();

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
                        {products.length === 0 ? (
                            <div className="rounded-xl border border-dashed p-16 text-center">
                                No products found.
                            </div>
                        ) : (
                            <ProductGrid products={products} />
                        )}
                    </div>

                </div>


            </div>
        </PublicLayout>
    );
}

