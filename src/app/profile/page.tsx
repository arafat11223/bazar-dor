import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../lib/auth";
import ProfileForm from "../../components/auth/ProfileForm";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?callbackURL=/profile");
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-brand-light px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">
            আপনার প্রোফাইল
          </h1>

          <p className="mt-2 text-sm text-foreground/60">
            আপনার ব্যক্তিগত তথ্য এখানে আপডেট করতে পারবেন।
          </p>
        </div>

        <ProfileForm
          initialName={session.user.name}
          email={session.user.email}
        />
      </div>
    </main>
  );
}