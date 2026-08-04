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
                <a
                    key={item.href}
                    href={item.href}
                    className="transition-colors hover:text-amber-600"
                >
                    {item.label}
                </a>
            ))}
        </nav>
    );
}
