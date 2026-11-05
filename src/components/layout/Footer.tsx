import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-7 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

        {/* Brand Information */}
        <Link
          href="/"
          className="text-lg font-bold text-foreground transition-colors hover:text-brand"
        >
          বাজার<span className="text-brand">দর</span>

          <p className="mt-1 text-sm font-normal text-foreground/60">
            প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </Link>

        {/* Disclaimer */}
        <p className="max-w-lg text-sm leading-7 text-foreground/60 md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>

      {/* Copyright */}
      <div className="border-t border-border bg-surface-muted/50">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-foreground/50 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
}