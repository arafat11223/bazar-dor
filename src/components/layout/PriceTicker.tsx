import { fetchProducts } from "../../lib/api";

function formatBengaliNumber(value: number) {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(value);
}

export default async function PriceTicker() {
  let products;

  try {
    products = await fetchProducts();
  } catch {
    return null;
  }

  if (!products.length) return null;

  return (
    <section
      className="overflow-hidden border-b border-border bg-brand text-white"
      aria-label="চলমান বাজারদর"
    >
      <div className="flex h-11 items-center">
        <div className="z-10 flex h-full shrink-0 items-center bg-brand-dark px-4 text-sm font-bold">
          <span className="mr-2">●</span>
          লাইভ বাজারদর
        </div>

        <div className="ticker-track flex min-w-0 flex-1">
          {[0, 1].map((group) => (
            <div
              key={group}
              className="ticker-group flex shrink-0 items-center"
              aria-hidden={group === 1}
            >
              {products.map((product) => (
                <div
                  key={`${group}-${product.id}`}
                  className="flex shrink-0 items-center gap-2 px-5 text-sm"
                >
                  <span className="text-lg">{product.image}</span>

                  <span className="font-semibold">
                    {product.nameBn}
                  </span>

                  <span className="text-white/90">
                    {formatBengaliNumber(product.today)} টাকা/
                    {product.unit}
                  </span>

                  <span
                    className={`font-bold ${
                      product.change.dir === "up"
                        ? "text-green-200"
                        : product.change.dir === "down"
                          ? "text-red-200"
                          : "text-white/70"
                    }`}
                  >
                    {product.change.dir === "up"
                      ? "▲"
                      : product.change.dir === "down"
                        ? "▼"
                        : "—"}{" "}
                    {formatBengaliNumber(product.change.pct)}%
                  </span>

                  <span className="ml-3 text-white/40">|</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
// done