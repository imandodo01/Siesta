import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type Variant =
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger';

type Size =
    | 'sm'
    | 'md'
    | 'lg';

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    loading?: boolean;
}

export default function Button({
    variant = 'primary',
    size = 'md',
    loading = false,
    className,
    children,
    disabled,
    ...props

}: ButtonProps) {
    return (
        <button
            disabled={disabled || loading}
            className={clsx(
                "inline-flex items-center justify-center rounded-xl font-medium transition-all",
                "focus:outline-none focus:ring-2 focus:ring-offset-2",
                {
                    "bg-amber-600 text-white hover:bg-amber-700":
                        variant === "primary",
                    "bg-stone-200 text-stone-900 hover:bg-stone-300":
                        variant === "secondary",
                    "border border-stone-300 hover:bg-stone-100":
                        variant === "outline",
                    "hover:bg-stone-100":
                        variant === "ghost",
                    "bg-red-600 text-white hover:bg-red-700":
                        variant === "danger",
                    "px-3 py-2 text-sm":
                        size === "sm",
                    "px-4 py-2":
                        size === "md",
                    "px-6 py-3 text-lg":
                        size === "lg",
                    "opacity-50 cursor-not-allowed":
                        disabled || loading,
                },
                className
            )}
            {...props}
        >
            {loading ? "Loading..." : children}
        </button>
    );
}
