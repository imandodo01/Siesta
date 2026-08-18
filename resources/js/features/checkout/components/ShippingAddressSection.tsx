import { ChangeEvent } from "react";

type CheckoutForm = {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    notes: string;
};

type CheckoutErrors = Partial<Record<keyof CheckoutForm, string>>;

type ShippingAddressSectionProps = {
    form: CheckoutForm;
    errors: CheckoutErrors;
    onFieldChange: (
        field: keyof CheckoutForm,
    ) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function ShippingAddressSection({
    form,
    errors,
    onFieldChange,
}: ShippingAddressSectionProps) {
    return (
        <section className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Shipping Address</h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-[var(--color-text)]">
                        Address
                    </label>
                    <input
                        type="text"
                        value={form.address}
                        onChange={onFieldChange("address")}
                        className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 focus:border-amber-500 focus:outline-none"
                        placeholder="Street, building number"
                    />
                    {errors.address && (
                        <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--color-text)]">
                        City
                    </label>
                    <input
                        type="text"
                        value={form.city}
                        onChange={onFieldChange("city")}
                        className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 focus:border-amber-500 focus:outline-none"
                        placeholder="Jakarta"
                    />
                    {errors.city && (
                        <p className="mt-2 text-sm text-red-600">{errors.city}</p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--color-text)]">
                        Postal code
                    </label>
                    <input
                        type="text"
                        value={form.postalCode}
                        onChange={onFieldChange("postalCode")}
                        className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 focus:border-amber-500 focus:outline-none"
                        placeholder="12345"
                    />
                    {errors.postalCode && (
                        <p className="mt-2 text-sm text-red-600">{errors.postalCode}</p>
                    )}
                </div>

                <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-[var(--color-text)]">
                        Order notes (optional)
                    </label>
                    <textarea
                        value={form.notes}
                        onChange={onFieldChange("notes")}
                        rows={4}
                        className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 focus:border-amber-500 focus:outline-none"
                        placeholder="Delivery instructions or special request"
                    />
                </div>
            </div>
        </section>
    );
}
