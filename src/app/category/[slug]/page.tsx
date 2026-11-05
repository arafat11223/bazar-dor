import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchCategories, fetchProductsByCategory } from "../../../lib/api";
import CategoryProductList from "../../../components/categories/CategoryProductList";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  const categories = await fetchCategories();

  const category = categories.find(
    (item) => item.slug === slug,
  );

  // Invalid category হলে 404 দেখাবে
  if (!category) {
    notFound();
  }

  const products = await fetchProductsByCategory(slug);

  return (
    <main className="min-h-screen flex-1">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-foreground/60">
          <Link href="/" className="transition-colors hover:text-brand">
            হোম
          </Link>

          <span>/</span>

          <span className="font-semibold text-brand">
            {category.nameBn}
          </span>
        </div>

        {/* Category Header */}
        <div className="mb-8 rounded-2xl border border-border bg-brand-light p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm">
              {category.icon}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                {category.nameBn}
              </h1>

              <p className="mt-1 text-sm text-foreground/60 sm:text-base">
                {category.nameBn} বিভাগের সকল পণ্যের আজকের বাজারদর।
              </p>
            </div>
          </div>
        </div>

        {/* Products */}
        <CategoryProductList products={products} />
      </div>
    </main>
  );
}