import { Link } from "@inertiajs/react";
import AdminLayout from "@/layouts/AdminLayout";
import Button from "@/components/Button/Button";
import BannerForm, { BannerFormData } from "../../components/BannerForm";
type Banner = BannerFormData & { id: number; image?: string | null; buttonLabel?: string | null; buttonUrl?: string | null; sortOrder?: number; isActive?: boolean };
export default function Edit({ banner }: { banner: Banner }) { return <AdminLayout><div className="mb-6 flex justify-between"><h1 className="text-3xl font-bold">Edit Banner</h1><Link href={route('admin.banners.index')}><Button variant="outline">Back</Button></Link></div><BannerForm initialData={{ ...banner, image: null, imageUrl: banner.image, button_label: banner.buttonLabel ?? '', button_url: banner.buttonUrl ?? '', sort_order: banner.sortOrder ?? 0, is_active: banner.isActive ?? true }} submit={form => { form.transform(data => ({ ...data, _method: 'put' })); form.post(route('admin.banners.update', banner.id), { forceFormData: true }); }} submitLabel="Save changes" /></AdminLayout>; }
