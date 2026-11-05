import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="overflow-hidden bg-brand-light">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
        {/* Hero Text */}
        <div className="max-w-xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-4 py-2 text-sm font-semibold text-brand">
            <span className="h-2 w-2 rounded-full bg-brand" />
            প্রতিদিনের বাজারদর, এক জায়গায়
          </p>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            আজকের বাজারের
            <span className="mt-2 block text-brand">
              দাম এক নজরে
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-foreground/70 sm:text-lg">
            চাল, ডাল, মাছ, মাংস, সবজি ও নিত্যপ্রয়োজনীয় পণ্যের
            সর্বশেষ বাজারদর জানুন সহজেই। বাজারে যাওয়ার আগেই
            জেনে নিন কোন পণ্যের দাম কত।
          </p>

          <Link
            href="#সব-পণ্য"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
          >
            সব পণ্য দেখুন
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Hero Image */}
        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute inset-5 rounded-full bg-brand/10 blur-3xl" />

          <Image
            src="/assets/bazar-hero.png"
            alt="বাজারের বিভিন্ন নিত্যপ্রয়োজনীয় পণ্য"
            width={600}
            height={500}
            priority
            className="relative z-10 h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}