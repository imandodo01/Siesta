import { Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/layouts/AdminLayout";
import Button from "@/components/Button/Button";
import ProductForm, { CategoryOption, ProductFormData } from "../../components/ProductForm";

type Props = { product: ProductFormData & { id: number; image?: string | null; categoryId?: number | null; isFeatured?: boolean; isActive?: boolean }; categories: CategoryOption[] };

export default function Edit({ product, categories }: Props) {
    return (
        <AdminLayout>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Edit Product</h1>
                <Link href={route("admin.products.index")}><Button variant="outline">Back</Button></Link>
            </div>
            <ProductForm categories={categories}
                initialData={{ ...product, category_id: product.categoryId ?? "", image: null, imageUrl: product.image, is_featured: product.isFeatured ?? product.is_featured, is_active: product.isActive ?? product.is_active }}
                submit={(form: ReturnType<typeof useForm<ProductFormData>>) => { form.transform((data) => ({ ...data, _method: "put" })); form.post(route("admin.products.update", product.id), { forceFormData: true }); }}
                submitLabel="Save changes"
            />
        </AdminLayout>
    );
}
