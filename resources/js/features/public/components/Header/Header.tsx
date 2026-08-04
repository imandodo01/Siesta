export default function Header() {
    return (
        <header className="border-b border-[var(--color-border)] bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <h1 className="text-2xl font-semibold">
                    Siesta
                </h1>

                <nav className="flex items-center gap-6 text-sm">
                    <a href="#">Home</a>
                    <a href="#">Products</a>
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                </nav>
            </div>
        </header>
    );
}
