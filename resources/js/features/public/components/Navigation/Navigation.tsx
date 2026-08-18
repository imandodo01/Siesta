import { Link, usePage } from "@inertiajs/react";

import { useCart } from "@/features/cart/context/CartContext";

const items = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
];

export default function Navigation() {
    const { itemCount } = useCart();
    const { auth } = usePage().props as { auth?: { user?: { id?: number; name?: string; email?: string } } };

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

            {!auth?.user ? (
                <>
                    <Link href={route('login')} className="transition-colors hover:text-amber-600">
                        Login
                    </Link>
                    <Link href={route('register')} className="transition-colors hover:text-amber-600">
                        Register
                    </Link>
                </>
            ) : (
                <>
                    <Link href="/account" className="transition-colors hover:text-amber-600">
                        Account
                    </Link>
                    <Link href={route('logout')} method="post" as="button" className="transition-colors hover:text-amber-600">
                        Logout
                    </Link>
                </>
            )}

            <Link href="/cart" className="relative inline-flex items-center gap-2 font-medium transition-colors hover:text-amber-600">
                Cart
                {itemCount > 0 && (
                    <span className="inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-amber-600 px-1.5 text-[10px] font-semibold text-white">
                        {itemCount}
                    </span>
                )}
            </Link>
        </nav>
    );
}
