import { Link } from "@inertiajs/react";

import Button from "@/components/Button/Button";
import { CartItem } from "@/features/cart/context/CartContext";

type OrderSummaryProps = {
    items: CartItem[];
    subtotal: number;
    shipping: number;
    grandTotal: number;
    isSubmitting: boolean;
    submitError: string;
    formatPrice: (price: number) => string;
};

export default function OrderSummary({
    items,
    subtotal,
    shipping,
    grandTotal,
    isSubmitting,
    submitError,
    formatPrice,
}: OrderSummaryProps) {
    return (
        <aside className="h-fit rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Order Summary</h2>

            <div className="mt-6 space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="flex gap-3 rounded-2xl border border-[var(--color-border)] p-3">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="h-16 w-16 rounded-xl object-cover"
                        />

                        <div className="flex flex-1 items-center justify-between gap-3">
                            <div>
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <span className="font-semibold text-[var(--color-text)]">
                                {formatPrice(item.price * item.quantity)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 space-y-4 border-t border-[var(--color-border)] pt-5 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4 text-base font-bold text-[var(--color-text)]">
                    <span>Grand total</span>
                    <span>{formatPrice(grandTotal)}</span>
                </div>
            </div>

            <div className="mt-6 space-y-3">
                <Button type="submit" className="w-full justify-center" loading={isSubmitting}>
                    {isSubmitting ? "Placing Order..." : "Place Order"}
                </Button>
                <Link href="/cart">
                    <Button variant="outline" className="w-full justify-center mt-2">
                        Back to Cart
                    </Button>
                </Link>
            </div>

            {submitError && (
                <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {submitError}
                </p>
            )}
        </aside>
    );
}
