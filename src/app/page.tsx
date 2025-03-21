import { Toaster } from "@/components/ui/sonner";
import { createClient } from "@/utlis/supabase/server";
import { redirect } from "next/navigation";
import Dashboard from "@/components/dashboard";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  return (
    <div>
      <Dashboard user={user} />
      <Toaster />
    </div>
  );
}
