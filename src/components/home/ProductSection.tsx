import type { Product } from "../../types/product";
import ProductCard from "../products/ProductCard";

interface ProductSectionProps {
  title: string;
  subtitle: string;
  products: Product[];
  id?: string;
}

export default function ProductSection({
  title,
  subtitle,
  products,
  id,
}: ProductSectionProps) {
  if (products.length === 0) return null;

  return (
    <section id={id} className="py-12 sm:py-16">
      <div className="mb-7 flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          {title}
        </h2>

        <p className="text-sm text-foreground/60 sm:text-base">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}