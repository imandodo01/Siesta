import { Link } from "@inertiajs/react";
import AdminLayout from "@/layouts/AdminLayout";
import Button from "@/components/Button/Button";
import FaqForm from "../../components/FaqForm";
export default function Create() { return <AdminLayout><div className="mb-6 flex justify-between"><h1 className="text-3xl font-bold">Create FAQ</h1><Link href={route('admin.faqs.index')}><Button variant="outline">Back</Button></Link></div><FaqForm submit={form => form.post(route('admin.faqs.store'))} submitLabel="Create FAQ" /></AdminLayout>; }
