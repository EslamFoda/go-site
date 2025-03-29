import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { updateSiteSettings } from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { createClient } from "@/utlis/supabase/client";
import React from "react";

function PublishBtn() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { settings, editor, designSettings, selectedPallet, globalSections } =
    useAppSelector((state) => state.editor.present);
  const publishSite = async () => {
    const supabase = createClient();
    try {
      // Update site settings to mark as published
      dispatch(updateSiteSettings({ ...settings, isPublished: true }));

      // Check if a site already exists
      const { data: existingSites, error: checkError } = await supabase
        .from("published_sites")
        .select()
        .eq("settings->>siteId", settings.siteId) // Changed -> to ->>
        .maybeSingle();

      if (checkError) {
        throw checkError;
      }

      if (existingSites) {
        // Update existing site
        const { data, error: updateError } = await supabase
          .from("published_sites")
          .update({
            pages: editor.pages,
            designSettings: designSettings,
            selectedPallet: selectedPallet,
            globalSections: globalSections,
            settings: settings,
            owner_id: settings.owner_id,
          })
          .eq("owner_id", settings.owner_id)
          .select();

        if (updateError) throw updateError;

        toast({
          title: "Site Updated",
          description: "Your site has been successfully updated.",
        });
      } else {
        // Insert new site if no existing site found
        const { data, error: insertError } = await supabase
          .from("published_sites")
          .insert([
            {
              pages: editor.pages,
              designSettings: designSettings,
              selectedPallet: selectedPallet,
              globalSections: globalSections,
              settings: settings,
              owner_id: settings.owner_id,
            },
          ])
          .select();

        if (insertError) throw insertError;

        toast({
          title: "Site Published",
          description: "Your site has been successfully published.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an error publishing your site. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    }
  };
  return (
    <Button className="w-20 h-8 mx-3" onClick={publishSite}>
      Publish
    </Button>
  );
}

export default PublishBtn;
