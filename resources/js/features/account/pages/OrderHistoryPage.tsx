import { Link } from "@inertiajs/react";

import PublicLayout from "@/layouts/PublicLayout";
import Button from "@/components/Button/Button";

type OrderItem = {
    product_name: string;
    quantity: number;
    unit_price: number;
    line_total: number;
};

type OrderHistoryEntry = {
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
    created_at?: string;
};

type OrderHistoryPageProps = {
    orders: OrderHistoryEntry[];
};

export default function OrderHistoryPage({ orders }: OrderHistoryPageProps) {
    const formatPrice = (price: number) => `Rp ${price.toLocaleString("id-ID")}`;

    return (
        <PublicLayout>
            <div className="mx-auto max-w-5xl space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">
                            Account
                        </p>
                        <h1 className="mt-2 text-3xl font-bold">Order History</h1>
                    </div>
                    <Link href="/account">
                        <Button variant="outline">Back to Account</Button>
                    </Link>
                </div>

                {orders.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-[var(--color-border)] bg-white p-12 text-center shadow-sm">
                        <h2 className="text-2xl font-bold">No orders yet</h2>
                        <p className="mt-3 text-gray-600">Your recent orders will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <p className="text-sm text-stone-500">Order number</p>
                                        <p className="mt-1 text-xl font-bold">{order.order_number}</p>
                                    </div>
                                    <div className="text-left md:text-right">
                                        <p className="text-sm text-stone-500">Total</p>
                                        <p className="mt-1 text-xl font-bold text-[var(--color-text)]">
                                            {formatPrice(order.grand_total)}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 grid gap-3 text-sm text-stone-600 sm:grid-cols-3">
                                    <div>
                                        <span className="block text-stone-500">Order status</span>
                                        <span className="font-medium text-[var(--color-text)]">{order.status}</span>
                                    </div>
                                    <div>
                                        <span className="block text-stone-500">Payment status</span>
                                        <span className="font-medium text-[var(--color-text)]">{order.payment_status}</span>
                                    </div>
                                    <div>
                                        <span className="block text-stone-500">Date</span>
                                        <span className="font-medium text-[var(--color-text)]">
                                            {order.created_at ? new Date(order.created_at).toLocaleDateString("en-CA") : "—"}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-5 flex justify-end">
                                    <Link href={`/account/orders/${order.order_number}`}>
                                        <Button>View Order</Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
