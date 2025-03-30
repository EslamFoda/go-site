import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { updateSiteSettings } from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { createClient } from "@/utlis/supabase/client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  FacebookLogo,
  LinkedinLogo,
  WhatsappLogo,
  Copy,
  Check,
  CheckCircle,
  XLogo,
} from "@phosphor-icons/react";

const socials = [
  {
    name: "Twitter",
    icon: <XLogo size={20} weight="fill" />,
    platform: "twitter",
  },
  {
    name: "whatsapp",
    icon: <WhatsappLogo size={20} weight="fill" />,
    platform: "whatsapp",
  },
  {
    name: "Facebook",
    icon: <FacebookLogo size={20} weight="fill" />,
    platform: "facebook",
  },
  {
    name: "Linkedin",
    icon: <LinkedinLogo size={20} weight="fill" />,
    platform: "linkedin",
  },
];

function PublishBtn() {
  const dispatch = useAppDispatch();
  const { siteId } = useParams();
  const { toast } = useToast();
  const [isPublishing, setIsPublishing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [publishedDomain, setPublishedDomain] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const {
    settings,
    editor,
    designSettings,
    selectedPallet,
    globalSections,
    isSaving,
  } = useAppSelector((state) => state.editor.present);

  const sanitizeDomainName = (siteName: string) => {
    // Create a URL-friendly domain name
    const baseName = (siteName || `site-${siteId}`)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-") // Replace non-alphanumeric with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens

    return baseName || `site-${siteId}`;
  };

  const findUniqueDomainName = async (baseName: string) => {
    const supabase = createClient();

    // First try with just the base name
    let { data, error } = await supabase
      .from("published_sites")
      .select("domainName")
      .eq("domainName", baseName)
      .maybeSingle();

    if (error) throw error;

    // If base name is available, use it
    if (!data) {
      return baseName;
    }

    // Otherwise, try with sequential numbers
    let counter = 1;
    let isDomainUnique = false;
    let domainName = "";

    while (!isDomainUnique) {
      domainName = `${baseName}${counter}`;

      let { data, error } = await supabase
        .from("published_sites")
        .select("domainName")
        .eq("domainName", domainName)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        isDomainUnique = true;
      } else {
        counter++;
      }
    }

    return domainName;
  };

  const publishSite = async () => {
    setIsPublishing(true);
    const supabase = createClient();
    try {
      // Update site settings to mark as published
      dispatch(updateSiteSettings({ ...settings, isPublished: true }));

      // Check if a site already exists
      const { data: existingSite, error: checkError } = await supabase
        .from("published_sites")
        .select("domainName")
        .eq("settings->>siteId", siteId)
        .maybeSingle();

      if (checkError) {
        throw checkError;
      }

      if (existingSite) {
        // Update existing site, keeping the original domain name
        const { data, error: updateError } = await supabase
          .from("published_sites")
          .update({
            pages: editor.pages,
            designSettings: designSettings,
            selectedPallet: selectedPallet,
            globalSections: globalSections,
            settings: { ...settings, isPublished: true },
            owner_id: settings.owner_id,
            // Maintain existing domain name
          })
          .eq("settings->>siteId", siteId)
          .select();

        if (updateError) throw updateError;

        // Set domain for success modal
        setPublishedDomain(existingSite.domainName);
        setShowSuccessModal(true);
      } else {
        // Clean up site name to create a base domain
        const sanitizedName = sanitizeDomainName(settings.name);

        // Find a unique domain name with sequential numbering if needed
        const uniqueDomainName = await findUniqueDomainName(sanitizedName);

        // Insert new site with the unique domain name
        const { data, error: insertError } = await supabase
          .from("published_sites")
          .insert([
            {
              pages: editor.pages,
              designSettings: designSettings,
              selectedPallet: selectedPallet,
              globalSections: globalSections,
              settings: { ...settings, isPublished: true },
              owner_id: settings.owner_id,
              domainName: uniqueDomainName,
            },
          ])
          .select();

        if (insertError) throw insertError;

        // Set domain for success modal
        setPublishedDomain(uniqueDomainName);
        setShowSuccessModal(true);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an error publishing your site. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsPublishing(false);
    }
  };

  const copyToClipboard = () => {
    const url = `${publishedDomain}.vixx.site`;
    navigator.clipboard.writeText(url).then(
      () => {
        setIsCopied(true);
        // Reset copy icon after 2 seconds
        setTimeout(() => setIsCopied(false), 2000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast({
          title: "Copy failed",
          description: "Failed to copy URL to clipboard",
          variant: "destructive",
        });
      }
    );
  };

  const getSiteUrl = () => {
    return `${publishedDomain}.vixx.site`;
  };

  const shareToSocial = (platform: string) => {
    const siteUrl = getSiteUrl();
    const siteName = settings.name || "My Website";
    const shareText = `Check out my new website: ${siteName}`;
    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(siteUrl)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          siteUrl
        )}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          siteUrl
        )}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(
          `${shareText} ${siteUrl}`
        )}`;
        break;
      default:
        break;
    }

    // Open in a new window
    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };

  return (
    <>
      <Button
        className="min-w-20 h-8 mx-3 disabled:bg-primary disabled:opacity-100"
        onClick={publishSite}
        disabled={isPublishing || isSaving}
      >
        {isPublishing ? "Publishing..." : isSaving ? "Saving..." : "Publish"}
      </Button>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <DialogTitle className="text-center text-xl">
              Congratulations!
            </DialogTitle>
            <DialogDescription className="text-center">
              Your site has been successfully published!
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2 w-full items-center py-4">
            <div className="bg-muted px-2 h-12 rounded-md w-96 flex justify-between items-center">
              <span className="font-mono min-w-0 flex-1 truncate">
                {publishedDomain
                  ? `${publishedDomain}.vixx.site`
                  : "yourdomain.com/yoursite"}
              </span>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-auto p-0"
                onClick={copyToClipboard}
                title="Copy URL"
              >
                {isCopied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Social Sharing Buttons */}
            <div className="flex flex-row h-12 w-96 gap-2 justify-center mb-2">
              {socials.map((social) => (
                <Button
                  key={social.platform}
                  size="icon"
                  variant="ghost"
                  className="bg-muted w-full h-full p-0"
                  onClick={() => shareToSocial(social.platform)}
                >
                  {social.icon}
                </Button>
              ))}
            </div>

            <Button
              className="w-96"
              onClick={() => {
                window.open(`https://${publishedDomain}.vixx.site`, "_blank");
              }}
            >
              Visit site
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PublishBtn;
