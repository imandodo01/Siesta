import { Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/layouts/AdminLayout";
import Button from "@/components/Button/Button";
import ProductForm, { CategoryOption, ProductFormData } from "../../components/ProductForm";

export default function Create({ categories }: { categories: CategoryOption[] }) {
    return (
        <AdminLayout>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Create Product</h1>
                <Link href={route("admin.products.index")}><Button variant="outline">Back</Button></Link>
            </div>
            <ProductForm categories={categories} submit={(form: ReturnType<typeof useForm<ProductFormData>>) => form.post(route("admin.products.store"), { forceFormData: true })} submitLabel="Create product" />
        </AdminLayout>
    );
}
