export interface Product {
    id: number;
    sku: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    categoryName?: string;
    categorySlug?: string;
    stock: number;
    isFeatured: boolean;
}
