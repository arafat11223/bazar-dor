
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "../../lib/auth-client";
import SocialLoginButtons from "../../components/auth/SocialLoginButtons";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const registered = searchParams.get("registered") === "true";
  const socialError = searchParams.get("error") === "social-login";

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const result = await signIn.email({
        email,
        password,
      });

      if (result.error) {
        console.error("Better Auth Sign In Error:", result.error);

        const message =
          result.error.message || "সাইন ইন করা যায়নি।";

        setErrorMessage(message);
        toast.error(message);
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");

      const callbackURL = searchParams.get("callbackURL");

      const destination =
        callbackURL?.startsWith("/") && !callbackURL.startsWith("//")
          ? callbackURL
          : "/";

      router.push(destination);
      router.refresh();
    } catch (error) {
      console.error("Sign In Error:", error);

      const message =
        "সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।";

      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-brand-light px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8 text-center">
          <Link href="/" className="text-3xl font-bold text-foreground">
            বাজার<span className="text-brand">দর</span>
          </Link>

          <h1 className="mt-6 text-2xl font-bold text-foreground">
            আপনার অ্যাকাউন্টে প্রবেশ করুন
          </h1>

          <p className="mt-2 text-sm text-foreground/60">
            বাজার দর-এর সর্বশেষ বাজারদর দেখতে সাইন ইন করুন।
          </p>
        </div>

        {registered && (
          <div
            role="status"
            className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
          >
            আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে। এখন সাইন ইন করুন।
          </div>
        )}

        {(errorMessage || socialError) && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {errorMessage ||
              "সোশ্যাল লগইন সম্পন্ন হয়নি। আবার চেষ্টা করুন।"}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-foreground"
            >
              ইমেইল অ্যাড্রেস
            </label>

            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-brand"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-foreground"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              type="password"
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-brand"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-brand px-5 py-3.5 font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন করুন"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-foreground/50">অথবা</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <SocialLoginButtons />

        <p className="mt-7 text-center text-sm text-foreground/60">
          নতুন ব্যবহারকারী?{" "}
          <Link
            href="/signup"
            className="font-semibold text-brand hover:underline"
          >
            অ্যাকাউন্ট তৈরি করুন
          </Link>
        </p>
      </div>
    </main>
  );
}
