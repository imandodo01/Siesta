import { Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/layouts/AdminLayout";
import Button from "@/components/Button/Button";
import CategoryForm, { CategoryFormData } from "../../components/CategoryForm";

export default function Create() { return <AdminLayout><div className="mb-6 flex items-center justify-between"><h1 className="text-3xl font-bold">Create Category</h1><Link href={route("admin.categories.index")}><Button variant="outline">Back</Button></Link></div><CategoryForm submit={(form: ReturnType<typeof useForm<CategoryFormData>>) => form.post(route("admin.categories.store"), { forceFormData: true })} submitLabel="Create category" /></AdminLayout>; }
