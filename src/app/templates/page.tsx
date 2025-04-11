import { createClient } from "@/utlis/supabase/server";
import TemplateList from "./templateList";
import { redirect } from "next/navigation";

async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  return (
    <div className="container max-w-screen-md space-y-10 mt-28 sm:mb-4 mb-24 mx-auto">
      <div className="flex flex-col mt-10 gap-5 items-center justify-center text-center">
        <h1 className="text-2xl font-bold">AI Business Websites</h1>
        <p className="text-sm text-muted-foreground max-w-[360px]">
          Launch your business website with AI or use our easy-to-edit
          templates. No coding or design skills needed.
        </p>
      </div>
      <TemplateList user={user} />
    </div>
  );
}

export default Page;
