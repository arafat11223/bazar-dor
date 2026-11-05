"use client";

import { useMemo, useState } from "react";
import type { Product } from "../../types/product";
import ProductCard from "../products/ProductCard";

interface CategoryProductListProps {
  products: Product[];
}

type SortOption = "default" | "low-high" | "high-low";

export default function CategoryProductList({
  products,
}: CategoryProductListProps) {
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortOption === "low-high") {
      result.sort((a, b) => a.today - b.today);
    }

    if (sortOption === "high-low") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sortOption]);

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-white px-5 py-16 text-center">
        <p className="text-4xl">📦</p>

        <h2 className="mt-4 text-xl font-bold text-foreground">
          কোনো পণ্য পাওয়া যায়নি
        </h2>

        <p className="mt-2 text-sm text-foreground/60">
          এই ক্যাটাগরিতে বর্তমানে কোনো পণ্যের তথ্য নেই।
        </p>

        <a
          href="/"
          className="mt-6 inline-flex rounded-xl bg-brand px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          হোম পেজে ফিরে যান
        </a>
      </div>
    );
  }

  return (
    <div>
      {/* Sorting */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-foreground/60">
          মোট {new Intl.NumberFormat("bn-BD").format(products.length)}টি পণ্য
        </p>

        <div className="flex items-center gap-2">
          <label
            htmlFor="product-sort"
            className="text-sm font-medium text-foreground/70"
          >
            সাজান:
          </label>

          <select
            id="product-sort"
            value={sortOption}
            onChange={(event) =>
              setSortOption(event.target.value as SortOption)
            }
            className="rounded-xl border border-border bg-white px-3 py-2 text-sm font-medium text-foreground outline-none transition-colors focus:border-brand"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-high">দাম: কম থেকে বেশি</option>
            <option value="high-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}