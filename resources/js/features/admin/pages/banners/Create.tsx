import { Link } from "@inertiajs/react";
import AdminLayout from "@/layouts/AdminLayout";
import Button from "@/components/Button/Button";
import BannerForm from "../../components/BannerForm";
export default function Create() { return <AdminLayout><div className="mb-6 flex justify-between"><h1 className="text-3xl font-bold">Create Banner</h1><Link href={route('admin.banners.index')}><Button variant="outline">Back</Button></Link></div><BannerForm submit={form => form.post(route('admin.banners.store'), { forceFormData: true })} submitLabel="Create banner" /></AdminLayout>; }
