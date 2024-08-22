import { EditorPage } from "@/reduxStore/types";
import { createClient } from "../supabase/client";

export async function CreateSite(siteData: any) {
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

export const updateSectionContentAndStyle = async (
  pages: EditorPage[],
  siteId: string
) => {
  const supabase = createClient();
  const { data } = await supabase
    .from("sites")
    .update({ pages })
    .eq("siteId", siteId)
    .select();
};
