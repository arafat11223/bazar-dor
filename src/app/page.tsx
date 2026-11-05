import HeroSection from "../components/home/HeroSection";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />

      <section
        id="সব-পণ্য"
        className="mx-auto min-h-40 max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <h2 className="text-3xl font-bold text-foreground">
          সব পণ্য
        </h2>

        <p className="mt-2 text-foreground/70">
          নিত্যপ্রয়োজনীয় সব পণ্যের আজকের বাজারদর।
        </p>
      </section>
    </main>
  );
}