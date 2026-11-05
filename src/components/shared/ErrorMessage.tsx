import Link from "next/link";

interface ErrorMessageProps {
  title?: string;
  message?: string;
}

export default function ErrorMessage({
  title = "তথ্য লোড করা যায়নি",
  message = "দুঃখিত, বর্তমানে সার্ভার থেকে তথ্য পাওয়া যাচ্ছে না। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।",
}: ErrorMessageProps) {
  return (
    <div className="rounded-2xl border border-border bg-white px-5 py-14 text-center">
      <div className="text-5xl">⚠️</div>

      <h2 className="mt-5 text-xl font-bold text-foreground">
        {title}
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-foreground/60">
        {message}
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex rounded-xl bg-brand px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}