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

type CustomerInformationSectionProps = {
    form: CheckoutForm;
    errors: CheckoutErrors;
    onFieldChange: (
        field: keyof CheckoutForm,
    ) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function CustomerInformationSection({
    form,
    errors,
    onFieldChange,
}: CustomerInformationSectionProps) {
    return (
        <section className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Customer Information</h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-[var(--color-text)]">
                        Full name
                    </label>
                    <input
                        type="text"
                        value={form.fullName}
                        onChange={onFieldChange("fullName")}
                        className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 focus:border-amber-500 focus:outline-none"
                        placeholder="Your full name"
                    />
                    {errors.fullName && (
                        <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--color-text)]">
                        Email
                    </label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={onFieldChange("email")}
                        className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 focus:border-amber-500 focus:outline-none"
                        placeholder="name@example.com"
                    />
                    {errors.email && (
                        <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--color-text)]">
                        Phone
                    </label>
                    <input
                        type="tel"
                        value={form.phone}
                        onChange={onFieldChange("phone")}
                        className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 focus:border-amber-500 focus:outline-none"
                        placeholder="0812 3456 7890"
                    />
                    {errors.phone && (
                        <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                    )}
                </div>
            </div>
        </section>
    );
}
