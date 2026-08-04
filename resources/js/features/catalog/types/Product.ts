export interface Product {
    id: number;
    sku: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    isFeatured: boolean;
}
