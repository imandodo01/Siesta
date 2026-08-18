import { FormEvent } from "react";
import { useForm } from "@inertiajs/react";
import Button from "@/components/Button/Button";

export type CategoryOption = { id: number; name: string; slug: string; image?: string | null };
export type ProductFormData = {
    sku: string; slug: string; name: string; description: string; price: number;
    image: File | null; category_id: number | ""; stock: number; is_featured: boolean; is_active: boolean;
};

type Props = { categories: CategoryOption[]; initialData?: Partial<ProductFormData> & { imageUrl?: string | null }; submit: (form: ReturnType<typeof useForm<ProductFormData>>) => void; submitLabel: string };

export default function ProductForm({ categories, initialData, submit, submitLabel }: Props) {
    const form = useForm<ProductFormData>({
        sku: initialData?.sku ?? "", slug: initialData?.slug ?? "", name: initialData?.name ?? "",
        description: initialData?.description ?? "", price: initialData?.price ?? 0, image: null,
        category_id: initialData?.category_id ?? "", stock: initialData?.stock ?? 0,
        is_featured: initialData?.is_featured ?? false, is_active: initialData?.is_active ?? true,
    });
    const error = (field: keyof ProductFormData) => form.errors[field];

    return <form onSubmit={(event: FormEvent) => { event.preventDefault(); submit(form); }} className="space-y-6 rounded-2xl bg-white p-6 shadow-sm">
        <div className="grid gap-5 md:grid-cols-2">
            {([["name", "Name"], ["sku", "SKU"], ["slug", "Slug"]] as const).map(([field, label]) => <label key={field} className="block text-sm font-medium">{label}<input value={form.data[field]} onChange={(event) => form.setData(field, event.target.value)} className="mt-2 w-full rounded-xl border border-stone-300 px-3 py-2" />{error(field) && <span className="mt-1 block text-xs text-red-600">{error(field)}</span>}</label>)}
            <label className="block text-sm font-medium">Category<select value={form.data.category_id} onChange={(event) => form.setData("category_id", event.target.value ? Number(event.target.value) : "")} className="mt-2 w-full rounded-xl border border-stone-300 px-3 py-2"><option value="">Select category</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select>{error("category_id") && <span className="mt-1 block text-xs text-red-600">{error("category_id")}</span>}</label>
            <label className="block text-sm font-medium">Price<input type="number" min="0" step="0.01" value={form.data.price} onChange={(event) => form.setData("price", Number(event.target.value))} className="mt-2 w-full rounded-xl border border-stone-300 px-3 py-2" />{error("price") && <span className="mt-1 block text-xs text-red-600">{error("price")}</span>}</label>
            <label className="block text-sm font-medium">Stock<input type="number" min="0" value={form.data.stock} onChange={(event) => form.setData("stock", Number(event.target.value))} className="mt-2 w-full rounded-xl border border-stone-300 px-3 py-2" />{error("stock") && <span className="mt-1 block text-xs text-red-600">{error("stock")}</span>}</label>
        </div>
        <label className="block text-sm font-medium">Description<textarea value={form.data.description} onChange={(event) => form.setData("description", event.target.value)} className="mt-2 min-h-32 w-full rounded-xl border border-stone-300 px-3 py-2" />{error("description") && <span className="mt-1 block text-xs text-red-600">{error("description")}</span>}</label>
        <label className="block text-sm font-medium">Product image{initialData?.imageUrl && <img src={initialData.imageUrl} alt="Current product" className="my-2 h-20 w-20 rounded-lg object-cover" />}<input type="file" accept="image/*" onChange={(event) => form.setData("image", event.target.files?.[0] ?? null)} className="mt-2 block w-full rounded-xl border border-stone-300 px-3 py-2" />{error("image") && <span className="mt-1 block text-xs text-red-600">{error("image")}</span>}</label>
        <div className="flex gap-6 text-sm font-medium"><label className="flex items-center gap-2"><input type="checkbox" checked={form.data.is_featured} onChange={(event) => form.setData("is_featured", event.target.checked)} /> Featured</label><label className="flex items-center gap-2"><input type="checkbox" checked={form.data.is_active} onChange={(event) => form.setData("is_active", event.target.checked)} /> Active</label></div>
        <Button type="submit" disabled={form.processing}>{submitLabel}</Button>
    </form>;
}
