import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { v4 } from "uuid";
import { createClient } from "@/utlis/supabase/client";
import { ActiveUserType } from "@/utlis/auth-helper/client";
import { SiteData } from "@/types/siteData";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
interface GeneratingDialogProps {
  user: ActiveUserType;
  template: SiteData;
  openCreateTemplateModal: boolean;
  setOpenCreateTemplateModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTemplate: React.Dispatch<
    React.SetStateAction<SiteData | undefined>
  >;
}
function CreateTemplate({
  user,
  template,
  openCreateTemplateModal,
  setOpenCreateTemplateModal,
  setSelectedTemplate,
}: GeneratingDialogProps) {
  const [siteName, setSiteName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const siteId = v4();
  const router = useRouter();
  const { toast } = useToast();

  return (
    <Dialog
      open={openCreateTemplateModal}
      onOpenChange={(open) => {
        setOpenCreateTemplateModal(open);
        if (!open) {
          setSiteName("");
          setSelectedTemplate(undefined);
        }
      }}
    >
      <DialogContent
        hideCloseButton
        aria-describedby={undefined}
        className="sm:max-w-sm space-y-6"
      >
        <DialogHeader className="items-center">
          <DialogTitle>Site Name</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 items-center justify-center">
          <Input
            id="siteName"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="Enter brand name"
            className="focus-visible:ring-0 focus-visible:ring-transparent"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full bg-muted text-foreground hover:bg-muted">
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="w-full"
            disabled={!siteName || loading}
            onClick={async () => {
              setLoading(true); // Disable the button immediately
              const supabase = createClient();
              try {
                const { data, error } = await supabase
                  .from("sites")
                  .insert([
                    {
                      settings: {
                        email: user?.email,
                        favicon: "",
                        homePage: template.pages[0].pageId,
                        isTemplate: false,
                        showMadeBy: true,
                        name: siteName,
                        link: "",
                        siteId: siteId,
                        owner_id: user?.id,
                      },
                      selectedPallet: template.selectedPallet,
                      owner_id: user?.id,
                      deployed: false,
                      siteId: siteId,
                      designSettings: template.designSettings,
                      storage: [],
                      globalSections: template.globalSections,
                      pages: template.pages,
                    },
                  ])
                  .select();

                if (error) throw error; // Handle Supabase error explicitly

                // Only redirect on success; loading remains true until redirect
                router.push(`/site/${siteId}/editor`);
              } catch (error) {
                console.log(error);
                toast({
                  title: "Error",
                  description: "Failed to create site. Please try again.",
                  variant: "destructive",
                });
                setLoading(false); // Re-enable button only on failure
              }
              // Note: setLoading(false) is NOT called here; it stays true on success
            }}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTemplate;
