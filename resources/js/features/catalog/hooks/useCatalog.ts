import { useMemo, useState } from "react";
import { Product } from "../types/Product";

export default function useCatalog(products: Product[]) {

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
    }, [products, search, category, sort]);

    return {
        filteredProducts,
        search,
        category,
        sort,
        setSearch,
        setCategory,
        setSort,
    };
}
