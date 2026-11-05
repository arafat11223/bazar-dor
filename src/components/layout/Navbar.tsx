"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [today, setToday] = useState("");

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

  const isHomeActive = pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Navbar */}
        <div className="flex min-h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            aria-label="বাজার দর হোম"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-xl text-white">
              🛒
            </span>

            <span className="text-2xl font-bold tracking-tight text-foreground">
              বাজার<span className="text-brand">দর</span>
            </span>
          </Link>

          {/* Date */}
          <p className="hidden text-sm font-medium text-foreground/70 md:block">
            {today || "আজকের তারিখ"}
          </p>

          {/* Auth Links */}
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/signin"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-brand-light hover:text-brand sm:px-4"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark sm:px-4"
            >
              রেজিস্টার
            </Link>
          </div>
        </div>

        {/* Category Navigation */}
        <nav
          aria-label="প্রধান নেভিগেশন"
          className="-mx-4 flex items-center gap-1 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0"
        >
          <Link
            href="/"
            className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              isHomeActive
                ? "bg-brand-light text-brand"
                : "text-foreground/70 hover:bg-surface-muted hover:text-brand"
            }`}
          >
            হোম
          </Link>

          {categories.map((category) => {
            const isActive = pathname === `/category/${category.slug}`;

            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
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