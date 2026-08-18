import { Product } from "@/features/catalog/types/Product";
import PublicLayout from "@/layouts/PublicLayout";
import ProductGrid from "@/features/catalog/components/ProductGrid";
import Button from "@/components/Button/Button";
import { Link } from "@inertiajs/react";
import Container from "@/features/catalog/components/Container/Container";
import HeroSlider from "../components/HeroSlider";

type Props = {
    featuredProducts: Product[];
    newArrivals: Product[];
    banners: { id: number; title: string; description?: string | null; buttonLabel?: string | null; buttonUrl?: string | null; image: string }[];
    categories: { name: string; slug: string; image?: string | null }[];
};

export default function HomePage({ featuredProducts, newArrivals, banners, categories }: Props) {
    return (
        <PublicLayout>

            {/* Hero */}
            <HeroSlider banners={banners} />

            {/* Featured Products */}
            <section className="py-20">
                <Container>

                    <div className="mb-10">
                        <h2 className="text-3xl font-bold">
                            Featured Products
                        </h2>

                        <p className="mt-3 text-gray-600">
                            Hand-picked products from Siesta.
                        </p>
                    </div>

                    <ProductGrid products={featuredProducts} />

                </Container>
            </section>

            {/* Categories */}
            <section className="py-24">
                <Container>
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold">
                            Browse by Category
                        </h2>

                        <p className="mt-3 text-gray-600">
                            Find products tailored to your everyday lifestyle.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {categories.some((category) => category.slug === "coffee") && <Link
                        href="/products?category=coffee"
                        className="group overflow-hidden rounded-2xl border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <img
                            src="/images/categories/coffee.jpg"
                            alt="Coffee"
                            className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold">
                                Coffee
                            </h3>
                            <p className="mt-3 text-sm text-gray-600">
                                Premium beans and brewing essentials.
                            </p>
                            <span className="mt-5 inline-block text-sm font-medium text-amber-600">
                                Explore →
                            </span>
                        </div>
                    </Link>}
                    {categories.some((category) => category.slug === "office") && <Link
                        href="/products?category=office"
                        className="group overflow-hidden rounded-2xl border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <img
                            src="/images/categories/office.jpg"
                            alt="Office"
                            className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold">
                                Office
                            </h3>
                            <p className="mt-3 text-sm text-gray-600">
                                Workspace essentials for productivity.
                            </p>
                            <span className="mt-5 inline-block text-sm font-medium text-amber-600">
                                Explore →
                            </span>
                        </div>
                    </Link>}
                    {categories.some((category) => category.slug === "home") && <Link
                        href="/products?category=home"
                        className="group overflow-hidden rounded-2xl border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <img
                            src="/images/categories/home.jpg"
                            alt="Home"
                            className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold">
                                Home
                            </h3>
                            <p className="mt-3 text-sm text-gray-600">
                                Comfort and simplicity for your home.
                            </p>
                            <span className="mt-5 inline-block text-sm font-medium text-amber-600">
                                Explore →
                            </span>
                        </div>
                    </Link>}
                    {categories.some((category) => category.slug === "lifestyle") && <Link
                        href="/products?category=lifestyle"
                        className="group overflow-hidden rounded-2xl border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <img
                            src="/images/categories/lifestyle.jpg"
                            alt="Lifestyle"
                            className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold">
                                Lifestyle
                            </h3>
                            <p className="mt-3 text-sm text-gray-600">
                                Everyday essentials with timeless style.
                            </p>
                            <span className="mt-5 inline-block text-sm font-medium text-amber-600">
                                Explore →
                            </span>
                        </div>
                    </Link>}
                </div>

                </Container>
            </section>

            {/* Why Siesta? */}
            <section className="bg-stone-50 py-24">
                <Container>
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold">
                            Why Siesta?
                        </h2>
                        <p className="mt-3 text-gray-600">
                            Thoughtfully selected essentials for everyday living.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="rounded-2xl bg-white p-8 shadow-sm">
                            <h3 className="text-xl font-semibold">
                                Curated Selection
                            </h3>
                            <p className="mt-3 text-gray-600">
                                Every product is chosen for quality, function and simplicity.
                            </p>
                        </div>
                        <div className="rounded-2xl bg-white p-8 shadow-sm">
                            <h3 className="text-xl font-semibold">
                                Reliable Delivery
                            </h3>
                            <p className="mt-3 text-gray-600">
                                Secure shipping and dependable service from checkout to delivery.
                            </p>
                        </div>
                        <div className="rounded-2xl bg-white p-8 shadow-sm">
                            <h3 className="text-xl font-semibold">
                                Everyday Quality
                            </h3>
                            <p className="mt-3 text-gray-600">
                                Built for daily use with comfort and durability in mind.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* New Arrivals */}
            <section className="py-20">
                <Container>

                    <div className="mb-10">
                        <h2 className="text-3xl font-bold">
                            New Arrivals
                        </h2>

                        <p className="mt-3 text-gray-600">
                            Discover the latest additions to our collection.
                        </p>
                    </div>

                    <ProductGrid products={newArrivals} />

                </Container>
            </section>

            {/* Newsletter */}
            <section className="py-24">
                <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-stone-100 to-stone-50 px-8 py-16 text-center">
                    <h2 className="text-4xl font-bold">
                        Stay Inspired
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        Join our newsletter to receive curated collections,
                        seasonal recommendations, and updates from Siesta.
                    </p>
                    <div className="mx-aut mt-10 flex max-w-xl flex-col gap-4 sm:flex-row">
                        <input
                            type="email"
                            placeholder="newsletter@siesta.com"
                            className="flex-1 rounded-xl border border-gray-300 bg-white px-5 py-3 focus:border-amber-500 focus:outline-none"
                        />
                        <Button>
                            Join the Journey
                        </Button>
                    </div>
                </div>
            </section>

        </PublicLayout>
    );
}
