
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { signOut, useSession } from "../../lib/auth-client";

const categories = [
  { name: "চাল", slug: "chal" },
  { name: "ডাল", slug: "dal" },
  { name: "তেল", slug: "tel" },
  { name: "সবজি", slug: "sobji" },
  { name: "মাছ", slug: "mach" },
  { name: "মাংস", slug: "mangsho" },
  { name: "ডিম-দুধ", slug: "dim-dui" },
  { name: "মসলা", slug: "mosla" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const [today, setToday] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  // Format Bangla date
  useEffect(() => {
    const formattedDate = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Dhaka",
    }).format(new Date());

    setToday(formattedDate);
  }, []);

  // Show toast after successful social login
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("socialLogin") === "success") {
      toast.success("সোশ্যাল অ্যাকাউন্ট দিয়ে সফলভাবে লগইন হয়েছে!");

      params.delete("socialLogin");

      const query = params.toString();

      const cleanUrl = query
        ? `${window.location.pathname}?${query}`
        : window.location.pathname;

      window.history.replaceState(null, "", cleanUrl);
    }
  }, [pathname]);

  // Sign out
  async function handleSignOut() {
    setLoggingOut(true);

    try {
      const result = await signOut();

      if (result.error) {
        toast.error(
          result.error.message || "সাইন আউট করা যায়নি।",
        );
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label="বাজার দর হোম"
          >
            <Image
              src="/assets/logo-icon.png"
              alt="বাজার দর Logo"
              width={48}
              height={48}
              priority
              className="h-11 w-11 object-contain"
            />

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                বাজার<span className="text-brand">দর</span>
              </h1>

              <p className="text-xs font-medium text-foreground/60">
                {today || "আজকের তারিখ"}
              </p>
            </div>
          </Link>

          {/* Authentication */}
          <div className="flex shrink-0 items-center gap-2">
            {isPending ? (
              <div className="h-9 w-24 animate-pulse rounded-lg bg-surface-muted" />
            ) : session?.user ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-brand-light hover:text-brand"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-light font-bold text-brand">
                    {session.user.name?.charAt(0) || "U"}
                  </span>

                  <span className="hidden sm:inline">
                    {session.user.name}
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={loggingOut}
                  className="rounded-lg border border-border px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-60 sm:px-4"
                >
                  {loggingOut ? "অপেক্ষা করুন..." : "সাইন আউট"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-brand-light hover:text-brand sm:px-4"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark sm:px-5"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Category Navigation */}
        <nav
          aria-label="প্রধান নেভিগেশন"
          className="-mx-4 flex items-center justify-center gap-1 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0"
        >
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              pathname === "/"
                ? "bg-brand-light text-brand"
                : "text-foreground/70 hover:bg-surface-muted hover:text-brand"
            }`}
          >
            হোম
          </Link>

          {categories.map((category) => {
            const isActive =
              pathname === `/category/${category.slug}`;

            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                aria-current={isActive ? "page" : undefined}
                className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-brand-light text-brand"
                    : "text-foreground/70 hover:bg-surface-muted hover:text-brand"
                }`}
              >
                {category.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
