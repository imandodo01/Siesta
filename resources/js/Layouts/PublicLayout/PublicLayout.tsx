import { PropsWithChildren } from "react";

export default function PublicLayout({
    children,
}: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
            <header className="border-b border-[var(--color-border)] bg-white">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <h1 className="text-xl font-semibold">
                        Siesta
                    </h1>

                    <nav className="flex gap-6 text-sm">
                        <a href="#">Home</a>
                        <a href="#">Products</a>
                        <a href="#">About</a>
                        <a href="#">Contact</a>
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-8">
                {children}
            </main>

            <footer className="border-t border-[var(--color-border)] py-6 text-center text-sm text-[var(--color-text-muted)]">
                © {new Date().getFullYear()} Siesta
            </footer>
        </div>
    );
}
