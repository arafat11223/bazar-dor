import type { Product } from "../types/product";
import type { Category } from "../types/category";

const API_BASE_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

// API থেকে data আনার reusable function
async function fetchFromApi<T>(endpoint: string): Promise<T> {
  let lastError: unknown;

  for (const baseUrl of API_BASE_URLS) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        next: {
          revalidate: 60,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(
    `Unable to fetch data from API: ${
      lastError instanceof Error
        ? lastError.message
        : "Unknown error"
    }`,
  );
}

// API response থেকে array বের করা
function extractArray<T>(response: unknown): T[] {
  if (Array.isArray(response)) {
    return response as T[];
  }

  if (
    typeof response === "object" &&
    response !== null &&
    "data" in response &&
    Array.isArray(response.data)
  ) {
    return response.data as T[];
  }

  throw new Error("Invalid API response: Expected an array.");
}

// সব Products
export async function fetchProducts(): Promise<Product[]> {
  const response = await fetchFromApi<unknown>("/products");

  return extractArray<Product>(response);
}

// সব Categories
export async function fetchCategories(): Promise<Category[]> {
  const response = await fetchFromApi<unknown>("/categories");

  return extractArray<Category>(response);
}

// নির্দিষ্ট Category-এর Products
export async function fetchProductsByCategory(
  categorySlug: string,
): Promise<Product[]> {
  const response = await fetchFromApi<unknown>(
    `/products?category=${encodeURIComponent(categorySlug)}`,
  );

  return extractArray<Product>(response);
}

// নির্দিষ্ট Slug দিয়ে একটি Product
export async function fetchProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  const products = await fetchProducts();

  return products.find((product) => product.slug === slug);
}