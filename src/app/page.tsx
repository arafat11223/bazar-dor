import HeroSection from "../components/home/HeroSection";
import ProductSection from "../components/home/ProductSection";
import ErrorMessage from "../components/shared/ErrorMessage";
import { fetchProducts } from "../lib/api";
import type { Product } from "../types/product";

export default async function Home() {
  let products: Product[] = [];
  let hasError = false;

  try {
    products = await fetchProducts();
  } catch (error) {
    console.error("Failed to load products:", error);
    hasError = true;
  }

  const risingProducts = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallingProducts = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <main className="flex-1">
      <HeroSection />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {hasError ? (
          <div className="py-12">
            <ErrorMessage />
          </div>
        ) : products.length === 0 ? (
          <div className="py-12">
            <ErrorMessage
              title="কোনো পণ্য পাওয়া যায়নি"
              message="বর্তমানে প্রদর্শনের জন্য কোনো পণ্যের তথ্য নেই।"
            />
          </div>
        ) : (
          <>
            <ProductSection
              title="আজ দাম বেড়েছে ▲"
              subtitle="যেসব পণ্যের দাম আজ বেড়েছে।"
              products={risingProducts}
            />

            <ProductSection
              title="আজ দাম কমেছে ▼"
              subtitle="যেসব পণ্যের দাম আজ কমেছে।"
              products={fallingProducts}
            />

            <ProductSection
              id="সব-পণ্য"
              title="সব পণ্য"
              subtitle="নিত্যপ্রয়োজনীয় সব পণ্যের আজকের বাজারদর।"
              products={products}
            />
          </>
        )}
      </div>
    </main>
  );
}