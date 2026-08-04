import { Link } from "@inertiajs/react";

const items = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export default function Navigation() {
    return (
        <nav className="flex items-center gap-6 text-sm">
            {items.map((item) => (
                <Link
                    href={item.href}
                    key={item.href}
                    className="transition-colors hover:text-amber-600"
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
}
