import { Link } from "@inertiajs/react";
import AdminLayout from "@/layouts/AdminLayout";
import Button from "@/components/Button/Button";
import FaqForm, { FaqFormData } from "../../components/FaqForm";
type Faq = FaqFormData & { id: number; sortOrder?: number; isActive?: boolean };
export default function Edit({ faq }: { faq: Faq }) { return <AdminLayout><div className="mb-6 flex justify-between"><h1 className="text-3xl font-bold">Edit FAQ</h1><Link href={route('admin.faqs.index')}><Button variant="outline">Back</Button></Link></div><FaqForm initialData={{ ...faq, sort_order: faq.sortOrder ?? 0, is_active: faq.isActive ?? true }} submit={form => form.put(route('admin.faqs.update', faq.id))} submitLabel="Save changes" /></AdminLayout>; }
