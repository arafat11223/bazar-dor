
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "../../lib/auth-client";

interface SocialLoginButtonsProps {
  callbackURL?: string;
}

export default function SocialLoginButtons({
  callbackURL = "/?socialLogin=success",
}: SocialLoginButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<
    "google" | "github" | null
  >(null);

  async function handleSocialLogin(provider: "google" | "github") {
    setLoadingProvider(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL,
        errorCallbackURL: "/signin?error=social-login",
      });

      if (result.error) {
        console.error(`${provider} Login Error:`, result.error);

        toast.error(
          result.error.message || "সোশ্যাল লগইন করা যায়নি।",
        );

        setLoadingProvider(null);
      }
    } catch (error) {
      console.error("Social Login Error:", error);

      toast.error("লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setLoadingProvider(null);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => handleSocialLogin("google")}
        disabled={loadingProvider !== null}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-white px-5 py-3 font-semibold text-foreground transition hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="text-lg font-bold text-red-500">G</span>

        {loadingProvider === "google"
          ? "Google-এ সংযোগ হচ্ছে..."
          : "Google দিয়ে চালিয়ে যান"}
      </button>

      <button
        type="button"
        onClick={() => handleSocialLogin("github")}
        disabled={loadingProvider !== null}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-white px-5 py-3 font-semibold text-foreground transition hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="text-lg font-bold">GH</span>

        {loadingProvider === "github"
          ? "GitHub-এ সংযোগ হচ্ছে..."
          : "GitHub দিয়ে চালিয়ে যান"}
      </button>
    </div>
  );
}
