import { PropsWithChildren } from "react";

export default function StoreLayout({
    children,
}: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            {children}
        </div>
    );
}
