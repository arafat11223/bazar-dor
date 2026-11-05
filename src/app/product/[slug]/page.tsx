import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";

import {
  fetchCategories,
  fetchProductBySlug,
} from "../../../lib/api";

import { auth } from "../../../lib/auth";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function formatBengaliNumber(value: number) {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(value);
}

export default async function ProductDetailsPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  // Check Authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect unauthenticated users
  if (!session) {
    redirect(
      `/signin?callbackURL=${encodeURIComponent(`/product/${slug}`)}`
    );
  }

  // Fetch Product Data
  const product = await fetchProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const categories = await fetchCategories();

  const category = categories.find(
    (item) => item.slug === product.category,
  );

  const marketPrices = product.markets ?? [];

  const minimumPrice =
    marketPrices.length > 0
      ? Math.min(...marketPrices.map((market) => market.min))
      : product.today;

  const maximumPrice =
    marketPrices.length > 0
      ? Math.max(...marketPrices.map((market) => market.max))
      : product.today;

  const averagePrice =
    marketPrices.length > 0
      ? marketPrices.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0,
        ) / marketPrices.length
      : product.today;

  const changeColor =
    product.change.dir === "up"
      ? "text-price-down bg-red-50"
      : product.change.dir === "down"
        ? "text-price-up bg-green-50"
        : "text-foreground/60 bg-surface-muted";

  const changeIcon =
    product.change.dir === "up"
      ? "▲"
      : product.change.dir === "down"
        ? "▼"
        : "—";

  return (
    <main className="min-h-screen flex-1">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

        {/* Breadcrumb */}
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-foreground/60">
          <Link href="/" className="hover:text-brand">
            হোম
          </Link>

          <span>/</span>

          <Link
            href={`/category/${product.category}`}
            className="hover:text-brand"
          >
            {category?.nameBn ?? product.categoryNameBn}
          </Link>

          <span>/</span>

          <span className="font-semibold text-brand">
            {product.nameBn}
          </span>
        </div>

        {/* Product Overview */}
        <section className="grid gap-8 rounded-3xl border border-border bg-white p-5 sm:p-8 md:grid-cols-2 md:items-center">

          {/* Product Emoji */}
          <div className="flex min-h-64 items-center justify-center rounded-2xl bg-brand-light sm:min-h-80">
            <span className="text-8xl sm:text-9xl">
              {product.image}
            </span>
          </div>

          {/* Product Information */}
          <div>
            <span className="inline-flex rounded-full bg-brand-light px-4 py-2 text-sm font-semibold text-brand">
              {category?.icon} {category?.nameBn ?? product.categoryNameBn}
            </span>

            <h1 className="mt-5 text-3xl font-bold text-foreground sm:text-4xl">
              {product.nameBn}
            </h1>

            <p className="mt-3 text-foreground/60">
              প্রতি {product.unit}
            </p>

            <div className="mt-8 rounded-2xl bg-brand-light p-5">
              <p className="text-sm text-foreground/60">
                আজকের বাজারদর
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h2 className="text-3xl font-bold text-brand sm:text-4xl">
                  {formatBengaliNumber(product.today)} টাকা
                </h2>

                <span
                  className={`rounded-lg px-3 py-1.5 text-sm font-bold ${changeColor}`}
                >
                  {changeIcon}{" "}
                  {formatBengaliNumber(product.change.pct)}%
                </span>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-foreground/70">
              {product.nameBn} পণ্যের আজকের বাজারদর, বিভিন্ন বাজারের
              সর্বনিম্ন ও সর্বোচ্চ দাম এবং গড় মূল্য এখানে দেখতে পারবেন।
            </p>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-foreground">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

            <div className="rounded-2xl border border-border bg-white p-5">
              <p className="text-sm text-foreground/60">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-3 text-2xl font-bold text-price-up">
                {formatBengaliNumber(minimumPrice)} টাকা
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-5">
              <p className="text-sm text-foreground/60">
                সর্বোচ্চ দাম
              </p>

              <p className="mt-3 text-2xl font-bold text-price-down">
                {formatBengaliNumber(maximumPrice)} টাকা
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-5">
              <p className="text-sm text-foreground/60">
                গড় দাম
              </p>

              <p className="mt-3 text-2xl font-bold text-brand">
                {formatBengaliNumber(averagePrice)} টাকা
              </p>
            </div>

          </div>
        </section>

        {/* Market Price Table */}
        <section className="mt-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              বাজারভিত্তিক দাম
            </h2>

            <p className="mt-2 text-sm text-foreground/60">
              বিভিন্ন বাজারে {product.nameBn}-এর আজকের দাম।
            </p>
          </div>

          {marketPrices.length > 0 ? (
            <div className="overflow-x-auto rounded-2xl border border-border bg-white">
              <table className="w-full min-w-[550px] text-left">
                <thead className="bg-brand-light">
                  <tr>
                    <th className="px-5 py-4 text-sm font-bold text-foreground">
                      বাজারের নাম
                    </th>

                    <th className="px-5 py-4 text-sm font-bold text-foreground">
                      বিভাগ
                    </th>

                    <th className="px-5 py-4 text-sm font-bold text-foreground">
                      সর্বনিম্ন দাম
                    </th>

                    <th className="px-5 py-4 text-sm font-bold text-foreground">
                      সর্বোচ্চ দাম
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {marketPrices.map((market, index) => (
                    <tr
                      key={`${market.market}-${index}`}
                      className="border-t border-border"
                    >
                      <td className="px-5 py-4 text-sm font-semibold text-foreground">
                        {market.market}
                      </td>

                      <td className="px-5 py-4 text-sm text-foreground/70">
                        {market.division}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-price-up">
                        {formatBengaliNumber(market.min)} টাকা
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-price-down">
                        {formatBengaliNumber(market.max)} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-white p-8 text-center">
              <p className="text-foreground/60">
                বর্তমানে বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
              </p>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}