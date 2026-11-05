import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-brand-light text-6xl">
          🔎
        </div>

        <p className="mt-8 text-7xl font-bold text-brand">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
          দুঃখিত! পেজটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mt-4 leading-7 text-foreground/60">
          আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরানো হয়েছে,
          অথবা ঠিকানাটি ভুল হয়েছে।
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          <span>←</span>
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}