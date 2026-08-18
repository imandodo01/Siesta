import { Link } from "@inertiajs/react";

import PublicLayout from "@/layouts/PublicLayout";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button/Button";

type OrderItem = {
    product_name: string;
    quantity: number;
    unit_price: number;
    line_total: number;
};

type OrderConfirmationProps = {
    order: {
        order_number: string;
        customer_name: string;
        customer_email: string;
        phone: string;
        address: string;
        city: string;
        postal_code: string;
        status: string;
        payment_status?: string;
        subtotal: number;
        shipping_cost: number;
        grand_total: number;
        notes?: string | null;
        items: OrderItem[];
    };
};

export default function OrderConfirmationPage({ order }: OrderConfirmationProps) {
    const formatPrice = (price: number) => `Rp ${price.toLocaleString("id-ID")}`;
    const paymentStatus = order.payment_status ?? "unpaid";
    const paymentStatusLabel = paymentStatus === "paid" ? "Paid" : "Unpaid";
    const paymentStatusClass = paymentStatus === "paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700";

    return (
        <PublicLayout>
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "Checkout", href: "/checkout" },
                    { label: "Confirmation" },
                ]}
            />

            <div className="mx-auto max-w-4xl space-y-8 py-8">
                <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                        Order confirmed
                    </p>
                    <h1 className="mt-3 text-3xl font-bold">Thank you, {order.customer_name}</h1>
                    <p className="mt-3 text-gray-600">
                        Your order has been placed successfully. We&apos;ll be in touch soon.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
                    <section className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-4">
                            <h2 className="text-2xl font-bold">Order #{order.order_number}</h2>
                            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
                                {order.status}
                            </span>
                        </div>

                        <div className="mt-6 space-y-5">
                            {order.items.map((item) => (
                                <div key={`${order.order_number}-${item.product_name}`} className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--color-border)] p-4">
                                    <div>
                                        <h3 className="font-semibold">{item.product_name}</h3>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <span className="font-semibold">{formatPrice(item.line_total)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex items-center justify-between rounded-2xl border border-[var(--color-border)] bg-stone-50 p-4">
                            <div>
                                <p className="text-sm text-stone-500">Payment status</p>
                                <p className="font-semibold text-[var(--color-text)]">{paymentStatusLabel}</p>
                            </div>
                            <span className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] ${paymentStatusClass}`}>
                                {paymentStatusLabel}
                            </span>
                        </div>
                    </section>

                    <aside className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold">Order Summary</h2>

                        <div className="mt-6 space-y-4 text-sm text-gray-600">
                            <div className="flex items-center justify-between">
                                <span>Subtotal</span>
                                <span>{formatPrice(order.subtotal)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Shipping</span>
                                <span>{order.shipping_cost === 0 ? "Free" : formatPrice(order.shipping_cost)}</span>
                            </div>
                            <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4 text-base font-bold text-[var(--color-text)]">
                                <span>Total</span>
                                <span>{formatPrice(order.grand_total)}</span>
                            </div>
                        </div>

                        <div className="mt-8 space-y-3 border-t border-[var(--color-border)] pt-6 text-sm text-gray-600">
                            <p><span className="font-medium text-[var(--color-text)]">Email:</span> {order.customer_email}</p>
                            <p><span className="font-medium text-[var(--color-text)]">Phone:</span> {order.phone}</p>
                            <p><span className="font-medium text-[var(--color-text)]">Address:</span> {order.address}, {order.city}, {order.postal_code}</p>
                            {order.notes && <p><span className="font-medium text-[var(--color-text)]">Notes:</span> {order.notes}</p>}
                        </div>
                    </aside>
                </div>

                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                    <Link href={`/checkout/payment/${order.order_number}`}>
                        <Button>Go to payment</Button>
                    </Link>
                    <Link href="/products">
                        <Button variant="outline">Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        </PublicLayout>
    );
}
