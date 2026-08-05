import { Link } from "@inertiajs/react";

type BreadcrumbItem = {
    label: string;
    href?: string;
};

type Props = {
    items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: Props) {
    return (
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center gap-2"
                >
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-amber-600"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-medium text-gray-800">
                            {item.label}
                        </span>
                    )}

                    {index < items.length - 1 && (
                        <span>/</span>
                    )}
                </div>
            ))}
        </nav>
    );
}
