import Navigation from "../Navigation";

export default function Header() {
    return (
        <header className="border-b border-[var(--color-border)] bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                <h1 className="text-2xl font-semibold">
                    Siesta
                </h1>

                <Navigation />

            </div>
        </header>
    );
}
