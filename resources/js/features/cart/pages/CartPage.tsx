import { Link } from "@inertiajs/react";

import PublicLayout from "@/layouts/PublicLayout";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button/Button";
import { useCart } from "../context/CartContext";

export default function CartPage() {
    const { items, subtotal, total, updateQuantity, removeItem } = useCart();

    const formatPrice = (price: number) => `Rp ${price.toLocaleString("id-ID")}`;

    if (items.length === 0) {
        return (
            <PublicLayout>
                <Breadcrumb
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Cart" },
                    ]}
                />

                <div className="flex min-h-[50vh] items-center justify-center py-16">
                    <div className="max-w-xl rounded-3xl border border-dashed border-[var(--color-border)] bg-white p-12 text-center shadow-sm">
                        <h1 className="text-3xl font-bold">Your cart is empty</h1>
                        <p className="mt-4 text-gray-600">
                            Looks like you haven&apos;t added any products yet.
                        </p>
                        <Link href="/products" className="mt-8 inline-block">
                            <Button>Continue Shopping</Button>
                        </Link>
                    </div>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "Products", href: "/products" },
                    { label: "Cart" },
                ]}
            />

            <div className="grid gap-10 lg:grid-cols-[1.6fr_0.8fr]">
                <div className="space-y-5">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">Your Cart</h1>
                        <span className="text-sm text-gray-500">{items.length} item(s)</span>
                    </div>

                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col gap-5 rounded-3xl border border-[var(--color-border)] bg-white p-5 shadow-sm sm:flex-row"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="h-28 w-full rounded-2xl object-cover sm:w-28"
                            />

                            <div className="flex flex-1 flex-col justify-between gap-5 sm:flex-row">
                                <div className="space-y-2">
                                    <h2 className="text-xl font-semibold">{item.name}</h2>
                                    <p className="text-sm text-gray-500">{item.category}</p>
                                    <p className="text-lg font-bold text-amber-600">
                                        {formatPrice(item.price)}
                                    </p>
                                </div>

                                <div className="flex flex-col items-start justify-between gap-4 sm:items-end">
                                    <div className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] px-2 py-1">
                                        <button
                                            type="button"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg text-lg hover:bg-stone-100"
                                            aria-label={`Decrease quantity for ${item.name}`}
                                        >
                                            −
                                        </button>
                                        <span className="min-w-8 text-center font-medium">{item.quantity}</span>
                                        <button
                                            type="button"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg text-lg hover:bg-stone-100"
                                            aria-label={`Increase quantity for ${item.name}`}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <p className="font-semibold text-[var(--color-text)]">
                                            {formatPrice(item.price * item.quantity)}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => removeItem(item.id)}
                                            className="text-sm font-medium text-red-600 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <aside className="h-fit rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
                    <h2 className="text-2xl font-bold">Order Summary</h2>

                    <div className="mt-6 space-y-4 text-sm text-gray-600">
                        <div className="flex items-center justify-between">
                            <span>Subtotal</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Shipping</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div className="border-t border-[var(--color-border)] pt-4">
                            <div className="flex items-center justify-between text-base font-bold text-[var(--color-text)]">
                                <span>Total</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3">
                        <Link href="/checkout">
                            <Button className="w-full justify-center">
                                Proceed to Checkout
                            </Button>
                        </Link>
                        <Link href="/products">
                            <Button variant="outline" className="w-full justify-center mt-2">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </aside>
            </div>
        </PublicLayout>
    );
}
