import Button from '@/components/Button/Button';
import PublicLayout from '@/layouts/PublicLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <PublicLayout>
            <Head title="Log in" />

            <div className="mx-auto max-w-md rounded-[2rem] border border-[var(--color-border)] bg-white p-8 shadow-sm">
                <div className="mb-6 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">Welcome back</p>
                    <h1 className="mt-3 text-3xl font-bold text-[var(--color-text)]">Log in</h1>
                </div>

                {status && (
                    <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--color-text)]">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-[var(--color-accent)] focus:bg-white"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-[var(--color-text)]">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-[var(--color-accent)] focus:bg-white"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                    </div>

                    <label className="flex items-center gap-3 text-sm text-stone-600">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', !!e.target.checked)}
                            className="h-4 w-4 rounded border-stone-300 text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                        />
                        Remember me
                    </label>

                    <div className="flex items-center justify-between gap-3 pt-2">
                        {canResetPassword && (
                            <Link href={route('password.request')} className="text-sm text-stone-600 underline hover:text-[var(--color-text)]">
                                Forgot password?
                            </Link>
                        )}

                        <Button type="submit" disabled={processing} className="ml-auto">
                            Log in
                        </Button>
                    </div>
                </form>

                <div className="mt-6 border-t border-stone-200 pt-5 text-center text-sm text-stone-600">
                    Need an account?{' '}
                    <Link href={route('register')} className="font-medium text-[var(--color-text)] underline">
                        Register here
                    </Link>
                </div>
            </div>
        </PublicLayout>
    );
}
