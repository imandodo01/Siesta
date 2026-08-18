import Button from '@/components/Button/Button';
import PublicLayout from '@/layouts/PublicLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <PublicLayout>
            <Head title="Register" />

            <div className="mx-auto max-w-lg rounded-[2rem] border border-[var(--color-border)] bg-white p-8 shadow-sm">
                <div className="mb-6 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">Create account</p>
                    <h1 className="mt-3 text-3xl font-bold text-[var(--color-text)]">Register</h1>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-[var(--color-text)]">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            value={data.name}
                            className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-[var(--color-accent)] focus:bg-white"
                            autoComplete="name"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                    </div>

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
                            required
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
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                    </div>

                    <div>
                        <label htmlFor="password_confirmation" className="mb-2 block text-sm font-medium text-[var(--color-text)]">
                            Confirm password
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-[var(--color-accent)] focus:bg-white"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        {errors.password_confirmation && <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>}
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2">
                        <Link href={route('login')} className="text-sm text-stone-600 underline hover:text-[var(--color-text)]">
                            Already registered?
                        </Link>

                        <Button type="submit" disabled={processing}>
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        </PublicLayout>
    );
}
