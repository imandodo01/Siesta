import { Link } from "@inertiajs/react";

import PublicLayout from "@/layouts/PublicLayout";
import Button from "@/components/Button/Button";

type OrderItem = {
    id: number;
    product_name: string;
    quantity: number;
    unit_price: number;
    line_total: number;
};

type OrderDetailPageProps = {
    order: {
        id: number;
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

export default function OrderDetailPage({ order }: OrderDetailPageProps) {
    const formatPrice = (price: number) => `Rp ${price.toLocaleString("id-ID")}`;

    return (
        <PublicLayout>
            <div className="mx-auto max-w-5xl space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">
                            Account
                        </p>
                        <h1 className="mt-2 text-3xl font-bold">Order #{order.order_number}</h1>
                    </div>
                    <Link href="/account/orders">
                        <Button variant="outline">Back to Orders</Button>
                    </Link>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <section className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold">Items</h2>
                        <div className="mt-6 space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--color-border)] p-4">
                                    <div>
                                        <h3 className="font-semibold">{item.product_name}</h3>
                                        <p className="text-sm text-stone-500">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">{formatPrice(item.unit_price)}</p>
                                        <p className="text-sm text-stone-500">{formatPrice(item.line_total)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <aside className="space-y-6 rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
                        <div>
                            <h2 className="text-2xl font-bold">Order Summary</h2>
                            <div className="mt-5 space-y-3 text-sm text-stone-600">
                                <div className="flex items-center justify-between">
                                    <span>Order status</span>
                                    <span className="font-medium text-[var(--color-text)]">{order.status}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Payment status</span>
                                    <span className="font-medium text-[var(--color-text)]">{order.payment_status}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(order.subtotal)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Shipping</span>
                                    <span>{order.shipping_cost === 0 ? "Free" : formatPrice(order.shipping_cost)}</span>
                                </div>
                                <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-3 text-base font-bold text-[var(--color-text)]">
                                    <span>Total</span>
                                    <span>{formatPrice(order.grand_total)}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold">Customer & shipping</h3>
                            <div className="mt-4 space-y-2 text-sm text-stone-600">
                                <p><span className="font-medium text-[var(--color-text)]">Name:</span> {order.customer_name}</p>
                                <p><span className="font-medium text-[var(--color-text)]">Email:</span> {order.customer_email}</p>
                                <p><span className="font-medium text-[var(--color-text)]">Phone:</span> {order.phone}</p>
                                <p><span className="font-medium text-[var(--color-text)]">Address:</span> {order.address}, {order.city}, {order.postal_code}</p>
                                {order.notes && <p><span className="font-medium text-[var(--color-text)]">Notes:</span> {order.notes}</p>}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </PublicLayout>
    );
}
