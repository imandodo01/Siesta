export interface Product {
    id: number;
    sku: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    isFeatured: boolean;
}
