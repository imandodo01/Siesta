import { Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/layouts/AdminLayout";
import Button from "@/components/Button/Button";
import CategoryForm, { CategoryFormData } from "../../components/CategoryForm";

type Props = { category: CategoryFormData & { id: number; image?: string | null } };
export default function Edit({ category }: Props) { return <AdminLayout><div className="mb-6 flex items-center justify-between"><h1 className="text-3xl font-bold">Edit Category</h1><Link href={route("admin.categories.index")}><Button variant="outline">Back</Button></Link></div><CategoryForm initialData={{ ...category, image: null, imageUrl: category.image }} submit={(form: ReturnType<typeof useForm<CategoryFormData>>) => { form.transform((data) => ({ ...data, _method: "put" })); form.post(route("admin.categories.update", category.id), { forceFormData: true }); }} submitLabel="Save changes" /></AdminLayout>; }
