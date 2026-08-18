import { Link } from "@inertiajs/react";

import Button from "@/components/Button/Button";
import PublicLayout from "@/layouts/PublicLayout";

export default function AboutPage() {
    return (
        <PublicLayout>
            <div className="mx-auto max-w-4xl space-y-8 py-4">
                <div className="rounded-3xl border border-[var(--color-border)] bg-white p-8 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">
                        Our story
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-[var(--color-text)]">About Siesta</h1>
                    <p className="mt-4 text-lg text-[var(--color-text-muted)]">
                        Thoughtful home essentials for slower, calmer living.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <section className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold">Curated for everyday comfort</h2>
                        <p className="mt-4 text-[var(--color-text-muted)]">
                            Siesta brings together pieces that make home feel warm, functional, and beautifully lived in.
                            Every item is chosen to support the rituals of rest, gathering, and thoughtful routine.
                        </p>
                    </section>

                    <section className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold">Designed with intention</h2>
                        <p className="mt-4 text-[var(--color-text-muted)]">
                            We believe the objects around us should be useful, beautiful, and quietly uplifting.
                            That is why we focus on quality materials, timeless design, and pieces that age well with everyday life.
                        </p>
                    </section>
                </div>

                <section className="rounded-3xl border border-[var(--color-border)] bg-stone-50 p-8 shadow-sm">
                    <h2 className="text-2xl font-bold">Why customers return</h2>
                    <ul className="mt-5 space-y-4 text-[var(--color-text-muted)]">
                        <li>• Carefully selected products with practical elegance.</li>
                        <li>• Friendly, straightforward service from browsing to checkout.</li>
                        <li>• A calm storefront experience that feels like a considered home brand.</li>
                    </ul>
                </section>

                <div className="flex justify-center">
                    <Link href="/products">
                        <Button>Shop the collection</Button>
                    </Link>
                </div>
            </div>
        </PublicLayout>
    );
}
