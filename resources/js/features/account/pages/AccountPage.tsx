import { Link } from "@inertiajs/react";

import PublicLayout from "@/layouts/PublicLayout";
import Button from "@/components/Button/Button";

type AccountPageProps = {
    user: {
        id: number;
        name: string;
        email: string;
    };
};

export default function AccountPage({ user }: AccountPageProps) {
    return (
        <PublicLayout>
            <div className="mx-auto max-w-4xl space-y-8">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">
                        Account
                    </p>
                    <h1 className="mt-2 text-3xl font-bold">Hello, {user.name}</h1>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold">Profile</h2>
                        <div className="mt-6 space-y-3 text-sm text-stone-600">
                            <p><span className="font-medium text-[var(--color-text)]">Name:</span> {user.name}</p>
                            <p><span className="font-medium text-[var(--color-text)]">Email:</span> {user.email}</p>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold">Orders</h2>
                        <p className="mt-4 text-sm text-stone-600">
                            View your order history and order details.
                        </p>
                        <div className="mt-6">
                            <Link href="/account/orders">
                                <Button className="w-full justify-center">View Order History</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
