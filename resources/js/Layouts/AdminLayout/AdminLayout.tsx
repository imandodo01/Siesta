import { PropsWithChildren } from "react";

export default function AdminLayout({
    children,
}: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            {children}
        </div>
    );
}
