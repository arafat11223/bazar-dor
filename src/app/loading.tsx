export default function HomeLoading() {
  return (
    <main className="min-h-screen flex-1">
      {/* Hero Skeleton */}
      <section className="bg-brand-light">
        <div className="mx-auto grid max-w-7xl animate-pulse items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
          <div>
            <div className="h-8 w-52 rounded-full bg-white" />

            <div className="mt-6 h-12 w-full max-w-md rounded-lg bg-white" />

            <div className="mt-3 h-12 w-4/5 rounded-lg bg-white" />

            <div className="mt-6 h-4 w-full max-w-lg rounded bg-white" />
            <div className="mt-3 h-4 w-4/5 rounded bg-white" />

            <div className="mt-8 h-12 w-40 rounded-xl bg-white" />
          </div>

          <div className="mx-auto h-64 w-full max-w-lg rounded-3xl bg-white sm:h-80" />
        </div>
      </section>

      {/* Product Sections Skeleton */}
      <div className="mx-auto max-w-7xl animate-pulse px-4 sm:px-6 lg:px-8">
        {[0, 1, 2].map((section) => (
          <section key={section} className="py-12 sm:py-16">
            <div className="mb-7">
              <div className="h-8 w-48 rounded bg-surface-muted" />
              <div className="mt-3 h-4 w-72 max-w-full rounded bg-surface-muted" />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {Array.from({ length: 6 }).map((_, index) => (
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
          </section>
        ))}
      </div>
    </main>
  );
}