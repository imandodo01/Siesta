import { Link } from "@inertiajs/react";
import AdminLayout from "@/layouts/AdminLayout";
import Button from "@/components/Button/Button";

type Order = { order_number: string; customer_name: string; customer_email: string; status: string; payment_status: string; grand_total: number };
type Props = { orders: { data: Order[]; meta: { currentPage: number; lastPage: number; total: number } } };

export default function Index({ orders }: Props) {
    return <AdminLayout><div className="mb-6"><p className="text-sm uppercase tracking-widest text-stone-500">Admin</p><h1 className="text-3xl font-bold">Orders</h1></div><div className="overflow-x-auto rounded-2xl bg-white shadow-sm"><table className="w-full text-left text-sm"><thead className="border-b border-stone-200"><tr><th className="p-4">Order</th><th className="p-4">Customer</th><th className="p-4">Status</th><th className="p-4">Payment</th><th className="p-4">Total</th><th className="p-4" /></tr></thead><tbody>{orders.data.map((order) => <tr key={order.order_number} className="border-b border-stone-100"><td className="p-4 font-medium">{order.order_number}</td><td className="p-4">{order.customer_name}<br /><span className="text-stone-500">{order.customer_email}</span></td><td className="p-4">{order.status}</td><td className="p-4">{order.payment_status}</td><td className="p-4">Rp {Number(order.grand_total).toLocaleString("id-ID")}</td><td className="p-4 text-right"><Link href={route("admin.orders.show", order.order_number)}><Button size="sm" variant="outline">View</Button></Link></td></tr>)}</tbody></table></div></AdminLayout>;
}
