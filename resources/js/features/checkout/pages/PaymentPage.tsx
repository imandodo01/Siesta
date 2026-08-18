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

type PaymentPageProps = {
    order: {
        order_number: string;
        customer_name: string;
        customer_email: string;
        phone: string;
        address: string;
        city: string;
        postal_code: string;
        status: string;
        payment_status: string;
        payment_method?: string | null;
        subtotal: number;
        shipping_cost: number;
        grand_total: number;
        notes?: string | null;
        items: OrderItem[];
    };
};

export default function PaymentPage({ order }: PaymentPageProps) {
    const formatPrice = (price: number) => `Rp ${price.toLocaleString("id-ID")}`;
    const paymentStatusLabel = order.payment_status === "paid" ? "Paid" : "Unpaid";
    const paymentStatusClass = order.payment_status === "paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700";

    return (
        <PublicLayout>
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "Checkout", href: "/checkout" },
                    { label: "Payment" },
                ]}
            />

            <div className="mx-auto max-w-4xl space-y-8 py-8">
                <div className="rounded-3xl border border-[var(--color-border)] bg-white p-8 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">
                                Payment
                            </p>
                            <h1 className="mt-3 text-3xl font-bold">Complete your payment</h1>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] ${paymentStatusClass}`}>
                            {paymentStatusLabel}
                        </span>
                    </div>

                    <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                        <section className="space-y-6">
                            <div className="rounded-2xl border border-[var(--color-border)] bg-stone-50 p-5">
                                <p className="text-sm text-stone-500">Order reference</p>
                                <p className="mt-2 text-2xl font-bold">{order.order_number}</p>
                            </div>

                            <div className="rounded-2xl border border-[var(--color-border)] p-5">
                                <h2 className="text-xl font-bold">Payment method</h2>
                                <div className="mt-4 space-y-3">
                                    <label className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-white p-4">
                                        <span className="font-medium">Bank transfer</span>
                                        <input type="radio" name="payment_method" defaultChecked />
                                    </label>
                                    <label className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-white p-4 opacity-80">
                                        <span className="font-medium">Cash on delivery</span>
                                        <input type="radio" name="payment_method" readOnly />
                                    </label>
                                    <label className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-white p-4 opacity-80">
                                        <span className="font-medium">E-wallet</span>
                                        <input type="radio" name="payment_method" readOnly />
                                    </label>
                                </div>
                            </div>
                        </section>

                        <aside className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
                            <h2 className="text-xl font-bold">Amount due</h2>
                            <p className="mt-4 text-4xl font-bold text-[var(--color-text)]">
                                {formatPrice(order.grand_total)}
                            </p>

                            <div className="mt-6 space-y-3 text-sm text-stone-600">
                                <div className="flex items-center justify-between">
                                    <span>Order status</span>
                                    <span className="font-medium text-[var(--color-text)]">{order.status}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Payment status</span>
                                    <span className="font-medium text-[var(--color-text)]">{paymentStatusLabel}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(order.subtotal)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Shipping</span>
                                    <span>{order.shipping_cost === 0 ? "Free" : formatPrice(order.shipping_cost)}</span>
                                </div>
                            </div>

                            <div className="mt-8 space-y-3">
                                <Button className="w-full">Pay now</Button>
                                <Link href={`/checkout/confirmation/${order.order_number}`} className="block">
                                    <Button variant="outline" className="w-full">Back to order</Button>
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
