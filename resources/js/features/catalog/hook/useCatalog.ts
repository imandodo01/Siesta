import { useMemo, useState } from "react";
import { products } from "../data/Products";

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

    return {
        products: filteredProducts,
        search,
        category,
        sort,
        setSearch,
        setCategory,
        setSort,
    };
}
