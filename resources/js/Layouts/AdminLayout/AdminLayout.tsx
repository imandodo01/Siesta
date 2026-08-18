import { PropsWithChildren } from "react";
import { Head, Link } from "@inertiajs/react";

export default function AdminLayout({
    children,
}: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-stone-100 text-stone-900">
            <Head title="Admin" />
            <header className="border-b border-stone-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link href={route("admin.home")} className="text-lg font-bold">Siesta Admin</Link>
                    <nav aria-label="Admin navigation" className="flex items-center gap-5 text-sm">
                        <div className="flex items-center gap-4 border-r border-stone-200 pr-5">
                            <span className="font-semibold text-stone-500">Manage</span>
                            <Link href={route("admin.products.index")} className="hover:text-amber-700">Products</Link>
                            <Link href={route("admin.categories.index")} className="hover:text-amber-700">Categories</Link>
                            <Link href={route("admin.banners.index")} className="hover:text-amber-700">Banners</Link>
                            <Link href={route("admin.faqs.index")} className="hover:text-amber-700">FAQs</Link>
                            <Link href={route("admin.contact.edit")} className="hover:text-amber-700">Contact</Link>
                            <Link href={route("admin.orders.index")} className="hover:text-amber-700">Orders</Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href={route("account")} className="font-medium hover:text-amber-700">Go to storefront</Link>
                            <Link href={route("logout")} method="post" as="button" className="border-l border-stone-200 pl-4 font-medium text-stone-600 hover:text-red-700">Logout</Link>
                        </div>
                    </nav>
                </div>
            </header>
            <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
        </div>
    );
}
