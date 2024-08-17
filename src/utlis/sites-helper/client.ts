import { createClient } from "../supabase/client";

export async function CreateSite(siteData: any) {
  console.log(siteData, "siteData");
  const supabase = createClient();
  const { data, error: siteError } = await supabase
    .from("sites")
    .insert([
      {
        ...siteData,
      },
    ])
    .select();
}
