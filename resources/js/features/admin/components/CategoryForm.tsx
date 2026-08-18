import { FormEvent } from "react";
import { useForm } from "@inertiajs/react";
import Button from "@/components/Button/Button";

export type CategoryFormData = { name: string; slug: string; image: File | null };
type Props = { initialData?: Partial<CategoryFormData> & { imageUrl?: string | null }; submit: (form: ReturnType<typeof useForm<CategoryFormData>>) => void; submitLabel: string };

export default function CategoryForm({ initialData, submit, submitLabel }: Props) {
    const form = useForm<CategoryFormData>({ name: initialData?.name ?? "", slug: initialData?.slug ?? "", image: null });
    return <form onSubmit={(event: FormEvent) => { event.preventDefault(); submit(form); }} className="space-y-6 rounded-2xl bg-white p-6 shadow-sm">
        <label className="block text-sm font-medium">Name<input value={form.data.name} onChange={(event) => form.setData("name", event.target.value)} className="mt-2 w-full rounded-xl border border-stone-300 px-3 py-2" />{form.errors.name && <span className="mt-1 block text-xs text-red-600">{form.errors.name}</span>}</label>
        <label className="block text-sm font-medium">Slug<input value={form.data.slug} onChange={(event) => form.setData("slug", event.target.value)} className="mt-2 w-full rounded-xl border border-stone-300 px-3 py-2" />{form.errors.slug && <span className="mt-1 block text-xs text-red-600">{form.errors.slug}</span>}</label>
        <label className="block text-sm font-medium">Category image{initialData?.imageUrl && <img src={initialData.imageUrl} alt="Current category" className="my-2 h-20 w-20 rounded-lg object-cover" />}<input type="file" accept="image/*" onChange={(event) => form.setData("image", event.target.files?.[0] ?? null)} className="mt-2 block w-full rounded-xl border border-stone-300 px-3 py-2" />{form.errors.image && <span className="mt-1 block text-xs text-red-600">{form.errors.image}</span>}</label>
        <Button type="submit" disabled={form.processing}>{submitLabel}</Button>
    </form>;
}
