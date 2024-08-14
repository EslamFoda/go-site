import Logout from "@/components/shared/Logout";
import { Toaster } from "@/components/ui/sonner";
import { createClient } from "@/utlis/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user, "asdasd");

  if (!user) redirect("/login");

  return (
    <main>
      <Logout user={user} />
      create site is gonna be here
      <Link href="/editor">test</Link>
      <Toaster />
    </main>
  );
}
