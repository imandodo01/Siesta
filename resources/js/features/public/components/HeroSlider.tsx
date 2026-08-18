import { Link } from "@inertiajs/react";
import { useState } from "react";
import Button from "@/components/Button/Button";

type Banner = { id: number; title: string; description?: string | null; buttonLabel?: string | null; buttonUrl?: string | null; image: string };

export default function HeroSlider({ banners }: { banners: Banner[] }) {
    const [current, setCurrent] = useState(0);
    if (!banners.length) return <section className="bg-stone-50 py-20"><div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2"><div><h1 className="text-5xl font-bold leading-tight lg:text-6xl">Shopping Like It's a Dream</h1><p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">Curated essentials for work, home, and everyday living.</p><div className="mt-10"><Link href="/products"><Button>Explore Collection</Button></Link></div></div><img src="/images/hero/hero-uncutted.png" alt="Siesta Lifestyle" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl" /></div></section>;
    const banner = banners[current];
    return <section className="bg-stone-50 py-20"><div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2"><div><h1 className="text-5xl font-bold leading-tight lg:text-6xl">{banner.title}</h1>{banner.description && <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">{banner.description}</p>}{banner.buttonLabel && banner.buttonUrl && <div className="mt-10"><Link href={banner.buttonUrl}><Button>{banner.buttonLabel}</Button></Link></div>}{banners.length > 1 && <div className="mt-8 flex gap-2">{banners.map((item, index) => <button key={item.id} type="button" aria-label={`Show banner ${index + 1}`} onClick={() => setCurrent(index)} className={`h-2.5 w-2.5 rounded-full ${index === current ? "bg-amber-600" : "bg-stone-300"}`} />)}</div>}</div><img src={banner.image} alt={banner.title} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl" /></div></section>;
}
