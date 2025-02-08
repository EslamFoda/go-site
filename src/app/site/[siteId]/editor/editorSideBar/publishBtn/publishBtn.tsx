import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { updateSiteSettings } from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { createClient } from "@/utlis/supabase/client";
import React from "react";

function PublishBtn() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { editor } = useAppSelector((state) => state);
  const publishSite = async () => {
    const supabase = createClient();
    try {
      // Update site settings to mark as published
      dispatch(
        updateSiteSettings({ ...editor.present.settings, isPublished: true })
      );

      // Check if a site already exists
      const { data: existingSites, error: checkError } = await supabase
        .from("published_sites")
        .select()
        .eq("settings->>siteId", editor.present.settings.siteId) // Changed -> to ->>
        .maybeSingle();

      if (checkError) {
        throw checkError;
      }

      if (existingSites) {
        // Update existing site
        const { data, error: updateError } = await supabase
          .from("published_sites")
          .update({
            pages: editor.present.editor.pages,
            designSettings: editor.present.designSettings,
            selectedPallet: editor.present.selectedPallet,
            globalSections: editor.present.globalSections,
            settings: editor.present.settings,
            owner_id: editor.present.settings.owner_id,
          })
          .eq("owner_id", editor.present.settings.owner_id)
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
              pages: editor.present.editor.pages,
              designSettings: editor.present.designSettings,
              selectedPallet: editor.present.selectedPallet,
              globalSections: editor.present.globalSections,
              settings: editor.present.settings,
              owner_id: editor.present.settings.owner_id,
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
    <Button size="sm" onClick={publishSite}>
      Publish
    </Button>
  );
}

export default PublishBtn;
