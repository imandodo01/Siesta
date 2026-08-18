import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer className="border-t border-[var(--color-border)] py-6">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-sm text-[var(--color-text-muted)] md:flex-row">
                <div>© {new Date().getFullYear()} Siesta. All rights reserved.</div>
                <nav className="flex items-center gap-4">
                    <Link href="/about" className="transition-colors hover:text-amber-600">About</Link>
                    <Link href="/faq" className="transition-colors hover:text-amber-600">FAQ</Link>
                    <Link href="/contact" className="transition-colors hover:text-amber-600">Contact</Link>
                </nav>
            </div>
        </footer>
    );
}
