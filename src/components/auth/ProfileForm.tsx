
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "../../lib/auth-client";

interface ProfileFormProps {
  initialName: string;
  email: string;
}

export default function ProfileForm({
  initialName,
  email,
}: ProfileFormProps) {
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");

    const trimmedName = name.trim();

    if (!trimmedName) {
      const error = "আপনার নাম লিখুন।";
      setErrorMessage(error);
      toast.error(error);
      return;
    }

    if (trimmedName === initialName) {
      const info = "আপনার নাম পরিবর্তন করা হয়নি।";
      setMessage(info);
      toast.info(info);
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        console.error("Profile Update Error:", result.error);

        const error =
          result.error.message || "তথ্য আপডেট করা যায়নি।";

        setErrorMessage(error);
        toast.error(error);
        return;
      }

      setMessage("আপনার তথ্য সফলভাবে আপডেট হয়েছে।");
      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    } catch (error) {
      console.error("Profile Update Error:", error);

      const message =
        "তথ্য আপডেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।";

      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-8 flex flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-light text-3xl font-bold text-brand">
          {name.charAt(0).toUpperCase() || "U"}
        </div>

        <h2 className="mt-4 text-xl font-bold text-foreground">
          {name || "ব্যবহারকারী"}
        </h2>

        <p className="mt-1 text-sm text-foreground/60">
          {email}
        </p>
      </div>

      {message && (
        <div
          role="status"
          className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {message}
        </div>
      )}

      {errorMessage && (
        <div
          role="alert"
          className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-foreground"
          >
            আপনার নাম
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            maxLength={100}
            autoComplete="name"
            placeholder="আপনার নাম লিখুন"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-brand"
          />
        </div>

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
            value={email}
            readOnly
            className="w-full cursor-not-allowed rounded-xl border border-border bg-surface-muted px-4 py-3 text-sm text-foreground/60 outline-none"
          />

          <p className="mt-2 text-xs text-foreground/50">
            বর্তমানে ইমেইল পরিবর্তনের সুবিধা নেই।
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !name.trim()}
          className="w-full rounded-xl bg-brand px-5 py-3.5 font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "আপডেট হচ্ছে..." : "Update Information"}
        </button>
      </form>
    </div>
  );
}
