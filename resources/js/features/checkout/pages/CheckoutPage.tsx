import { ChangeEvent, FormEvent, useState } from "react";
import { Link, router } from "@inertiajs/react";

import PublicLayout from "@/layouts/PublicLayout";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button/Button";
import { useCart } from "@/features/cart/context/CartContext";
import CustomerInformationSection from "@/features/checkout/components/CustomerInformationSection";
import ShippingAddressSection from "@/features/checkout/components/ShippingAddressSection";
import OrderSummary from "@/features/checkout/components/OrderSummary";

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

const initialForm: CheckoutForm = {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
};

export default function CheckoutPage() {
    const { items, subtotal, clearCart } = useCart();
    const [form, setForm] = useState<CheckoutForm>(initialForm);
    const [errors, setErrors] = useState<CheckoutErrors>({});
    const [submitError, setSubmitError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formatPrice = (price: number) => `Rp ${price.toLocaleString("id-ID")}`;
    const shipping = subtotal === 0 ? 0 : subtotal >= 500000 ? 0 : 30000;
    const grandTotal = subtotal + shipping;

    const updateField = (field: keyof CheckoutForm) =>
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = event.target.value;

            setForm((currentForm) => ({
                ...currentForm,
                [field]: value,
            }));

            setErrors((currentErrors) => ({
                ...currentErrors,
                [field]: undefined,
            }));
        };

    const validateForm = () => {
        const nextErrors: CheckoutErrors = {};

        if (!form.fullName.trim()) {
            nextErrors.fullName = "Full name is required.";
        }

        if (!form.email.trim()) {
            nextErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            nextErrors.email = "Please enter a valid email address.";
        }

        if (!form.phone.trim()) {
            nextErrors.phone = "Phone number is required.";
        } else if (form.phone.replace(/\D/g, "").length < 8) {
            nextErrors.phone = "Please enter a valid phone number.";
        }

        if (!form.address.trim()) {
            nextErrors.address = "Shipping address is required.";
        }

        if (!form.city.trim()) {
            nextErrors.city = "City is required.";
        }

        if (!form.postalCode.trim()) {
            nextErrors.postalCode = "Postal code is required.";
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (items.length === 0) {
            return;
        }

        if (!validateForm()) {
            return;
        }

        const payload = {
            full_name: form.fullName,
            email: form.email,
            phone: form.phone,
            address: form.address,
            city: form.city,
            postal_code: form.postalCode,
            notes: form.notes,
            items: items.map((item) => ({
                id: item.id,
                sku: item.sku,
                slug: item.slug,
                name: item.name,
                description: item.description,
                price: item.price,
                image: item.image,
                category: item.category,
                stock: item.stock,
                quantity: item.quantity,
            })),
        };

        setIsSubmitting(true);
        setSubmitError("");

        window.axios
            .post("/checkout", payload)
            .then((response) => {
                const orderNumber = response.data.order.order_number;
                clearCart();
                setForm(initialForm);
                setErrors({});
                router.visit(`/checkout/confirmation/${orderNumber}`);
            })
            .catch((error) => {
                const message =
                    error.response?.data?.message ||
                    "We could not place your order. Please try again.";
                setSubmitError(message);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    if (items.length === 0) {
        return (
            <PublicLayout>
                <Breadcrumb
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Cart", href: "/cart" },
                        { label: "Checkout" },
                    ]}
                />

                <div className="flex min-h-[40vh] items-center justify-center py-12">
                    <div className="max-w-xl rounded-3xl border border-dashed border-[var(--color-border)] bg-white p-12 text-center shadow-sm">
                        <h1 className="text-3xl font-bold">Checkout is empty</h1>
                        <p className="mt-4 text-gray-600">
                            Add a few products to your cart before placing an order.
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
                    { label: "Cart", href: "/cart" },
                    { label: "Checkout" },
                ]}
            />

            <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="space-y-8">
                    <CustomerInformationSection
                        form={form}
                        errors={errors}
                        onFieldChange={updateField}
                    />

                    <ShippingAddressSection
                        form={form}
                        errors={errors}
                        onFieldChange={updateField}
                    />
                </div>

                <OrderSummary
                    items={items}
                    subtotal={subtotal}
                    shipping={shipping}
                    grandTotal={grandTotal}
                    isSubmitting={isSubmitting}
                    submitError={submitError}
                    formatPrice={formatPrice}
                />
            </form>
        </PublicLayout>
    );
}
