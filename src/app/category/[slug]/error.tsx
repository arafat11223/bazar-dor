"use client";

import { useEffect } from "react";
import ErrorMessage from "../../../components/shared/ErrorMessage";

interface CategoryErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CategoryError({
  error,
  reset,
}: CategoryErrorProps) {
  useEffect(() => {
    console.error("Category page error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <ErrorMessage
          title="ক্যাটাগরির তথ্য লোড করা যায়নি"
          message="সার্ভার থেকে পণ্যের তথ্য আনতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
        />

        <div className="mt-5 text-center">
          <button
            onClick={reset}
            className="rounded-xl border border-brand px-5 py-3 font-semibold text-brand transition-colors hover:bg-brand-light"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </div>
    </main>
  );
}