import PublicLayout from "@/layouts/PublicLayout";
import Toolbar from "../components/Toolbar";
import ProductGrid from "../components/ProductGrid";
import ProductFilter from "../components/ProductFilter";
import { products } from "../data/Products";
import { useMemo, useState } from "react";

export default function CatalogPage() {

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("Newest");

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (search) {
            result = result.filter((product) =>
                product.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        }

        if (category !== "All") {
            result = result.filter(
                (product) => product.category === category
            );
        }

        switch (sort) {
            case "Price Low":
                result.sort((a, b) => a.price - b.price);
                break;

            case "Price High":
                result.sort((a, b) => b.price - a.price);
                break;

            case "Name":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        return result;
    }, [search, category, sort]);

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

