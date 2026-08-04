import PublicLayout from "@/layouts/PublicLayout";

export default function HomePage() {
    return (
        <PublicLayout>
            <section className="py-24 text-center">

                <h1 className="text-6xl font-bold">
                    Commerce without noise.
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
                    A production-inspired commerce platform focused on thoughtful shopping.
                </p>

            </section>
        </PublicLayout>
    );
}
