export default function CategoryLoading() {
  return (
    <main className="min-h-screen flex-1">
      <div className="mx-auto max-w-7xl animate-pulse px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Breadcrumb Skeleton */}
        <div className="mb-6 h-4 w-40 rounded bg-surface-muted" />

        {/* Category Header Skeleton */}
        <div className="mb-8 flex items-center gap-4 rounded-2xl border border-border bg-white p-6 sm:p-8">
          <div className="h-16 w-16 rounded-2xl bg-surface-muted" />

          <div className="flex-1">
            <div className="h-7 w-36 rounded bg-surface-muted" />
            <div className="mt-3 h-4 w-64 max-w-full rounded bg-surface-muted" />
          </div>
        </div>

        {/* Sorting Skeleton */}
        <div className="mb-6 flex justify-between">
          <div className="h-5 w-28 rounded bg-surface-muted" />
          <div className="h-10 w-44 rounded-xl bg-surface-muted" />
        </div>

        {/* Product Card Skeleton */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-white p-4"
            >
              <div className="h-28 rounded-xl bg-surface-muted sm:h-32" />

              <div className="mt-4 h-5 w-24 rounded bg-surface-muted" />

              <div className="mt-3 h-4 w-16 rounded bg-surface-muted" />

              <div className="mt-5 h-6 w-28 rounded bg-surface-muted" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}