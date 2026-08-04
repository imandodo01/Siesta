import { PropsWithChildren } from "react";

import Header from "@/features/public/components/Header";
import Footer from "@/features/public/components/Footer";

export default function PublicLayout({
    children,
}: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col bg-[var(--color-background)] text-[var(--color-text)]">
            <Header />

            <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
                {children}
            </main>

            <Footer />
        </div>
    );
}
