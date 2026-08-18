import { useState } from "react";
import PublicLayout from "@/layouts/PublicLayout";

type Faq = { id: number; question: string; answer: string };
export default function FaqPage({ faqs }: { faqs: Faq[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    return <PublicLayout><div className="mx-auto max-w-4xl py-4"><div className="rounded-3xl border border-[var(--color-border)] bg-white p-8 shadow-sm"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Help center</p><h1 className="mt-4 text-4xl font-bold text-[var(--color-text)]">Frequently asked questions</h1><p className="mt-4 text-[var(--color-text-muted)]">A quick look at the most common things customers ask before and after checkout.</p></div><div className="mt-8 space-y-4">{faqs.map((faq, index) => { const isOpen = openIndex === index; return <div key={faq.id} className="rounded-3xl border border-[var(--color-border)] bg-white shadow-sm"><button type="button" onClick={() => setOpenIndex(isOpen ? null : index)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"><span className="text-lg font-semibold text-[var(--color-text)]">{faq.question}</span><span className="text-2xl text-stone-500">{isOpen ? "−" : "+"}</span></button>{isOpen && <div className="border-t border-[var(--color-border)] px-6 py-5 text-[var(--color-text-muted)]">{faq.answer}</div>}</div>; })}{faqs.length === 0 && <p className="rounded-3xl border border-dashed p-8 text-center text-stone-500">No FAQs are available yet.</p>}</div></div></PublicLayout>;
}
