import { Link } from "@inertiajs/react";
import AdminLayout from "@/layouts/AdminLayout";
import Button from "@/components/Button/Button";

type Product = { id: number; sku: string; name: string; categoryName?: string; category: string; price: number; stock: number; isFeatured: boolean; isActive: boolean };
type Props = { products: { data: Product[]; meta: { currentPage: number; lastPage: number; total: number } } };

export default function Index({ products }: Props) {
    return (
        <AdminLayout>
            <div className="mb-6 flex items-center justify-between">
                <div><p className="text-sm uppercase tracking-widest text-stone-500">Admin</p><h1 className="text-3xl font-bold">Products</h1></div>
                <Link href={route("admin.products.create")}><Button>Add product</Button></Link>
            </div>
            <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
                <table className="w-full text-left text-sm"><thead className="border-b border-stone-200"><tr><th className="p-4">Product</th><th className="p-4">SKU</th><th className="p-4">Category</th><th className="p-4">Price</th><th className="p-4">Stock</th><th className="p-4">Status</th><th className="p-4" /></tr></thead>
                    <tbody>{products.data.map((product) => <tr key={product.id} className="border-b border-stone-100"><td className="p-4 font-medium">{product.name}</td><td className="p-4">{product.sku}</td><td className="p-4">{product.categoryName ?? product.category}</td><td className="p-4">Rp {product.price.toLocaleString("id-ID")}</td><td className="p-4">{product.stock}</td><td className="p-4">{product.isActive ? "Active" : "Inactive"}</td><td className="space-x-3 p-4 text-right"><Link href={route("admin.products.edit", product.id)} className="font-medium text-amber-700">Edit</Link><Link href={route("admin.products.status", product.id)} method="patch" data={{ is_active: !product.isActive }} as="button" className="text-stone-600">{product.isActive ? "Deactivate" : "Restore"}</Link></td></tr>)}</tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
