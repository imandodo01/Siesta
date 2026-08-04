export default function Footer() {
    return (
        <footer className="border-t border-[var(--color-border)] py-6">
            <div className="mx-auto max-w-7xl px-6 text-center text-sm text-[var(--color-text-muted)]">
                © {new Date().getFullYear()} Siesta. All rights reserved.
            </div>
        </footer>
    );
}
