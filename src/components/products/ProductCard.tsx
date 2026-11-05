import Link from "next/link";
import type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
}

function formatBengaliNumber(value: number) {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(value);
}

export default function ProductCard({ product }: ProductCardProps) {
  const changeColor =
    product.change.dir === "up"
      ? "bg-red-50 text-price-down"
      : product.change.dir === "down"
        ? "bg-green-50 text-price-up"
        : "bg-surface-muted text-foreground/60";

  const changeIcon =
    product.change.dir === "up"
      ? "▲"
      : product.change.dir === "down"
        ? "▼"
        : "—";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group rounded-2xl border border-border bg-white p-4 transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg sm:p-5"
    >
      {/* Product Image */}
      <div className="flex h-28 items-center justify-center rounded-xl bg-brand-light sm:h-32">
        <span className="text-5xl transition-transform duration-200 group-hover:scale-110">
          {product.image}
        </span>
      </div>

      {/* Product Information */}
      <div className="mt-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {product.nameBn}
            </h3>

            <p className="mt-1 text-sm text-foreground/60">
              প্রতি {product.unit}
            </p>
          </div>

          <span
            className={`shrink-0 rounded-lg px-2 py-1 text-xs font-bold ${changeColor}`}
          >
            {changeIcon}{" "}
            {formatBengaliNumber(product.change.pct)}%
          </span>
        </div>

        {/* Price */}
        <div className="mt-4 border-t border-border pt-3">
          <p className="text-xs text-foreground/60">
            আজকের দাম
          </p>

          <p className="mt-1 text-xl font-bold text-brand">
            {formatBengaliNumber(product.today)} টাকা
          </p>
        </div>
      </div>
    </Link>
  );
}