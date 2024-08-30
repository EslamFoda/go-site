"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ActiveUserType } from "@/utlis/auth-helper/client";
import { v4 } from "uuid";
import { createClient } from "@/utlis/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface CreateSiteModalProps {
  children: React.ReactNode;
  user: ActiveUserType;
  sites: any[];
  setSites: React.Dispatch<React.SetStateAction<any[]>>;
}
function CreateSiteModal({
  children,
  user,
  sites,
  setSites,
}: CreateSiteModalProps) {
  const [siteName, setSiteName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const createSite = async () => {
    if (!siteName) {
      toast({
        title: "Error",
        description: "Site name is required",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    const siteId = v4();
    const homePageId = v4();
    const settings = {
      email: user?.email,
      favicon: "",
      homePage: homePageId,
      isTemplate: false,
      showMadeBy: true,
      name: siteName,
      link: "",
      siteId: siteId,
    };
    const supabase = createClient();
    const { data, error: siteError } = await supabase
      .from("sites")
      .insert([
        {
          settings,
          owner_id: user?.id,
          deployed: false,
          siteId: siteId,
          pages: [
            {
              pageId: homePageId,
              sections: [
                {
                  id: v4(),
                  sectionName: "Header",
                  content: {
                    Logo: {
                      type: "text",
                      text: "logo",
                    },
                    logo: {
                      link: "",
                      openNewTab: false,
                    },
                    links: [
                      {
                        text: "link 2",
                        link: "",
                        id: v4(),
                        openNewTab: false,
                        subLinks: [],
                      },
                      {
                        text: "link 3",
                        link: "",
                        id: v4(),
                        openNewTab: false,
                        subLinks: [],
                      },
                      {
                        text: "link 4",
                        link: "",
                        id: v4(),
                        openNewTab: false,
                        subLinks: [],
                      },
                    ],
                    buttons: [
                      {
                        text: "button 1",
                        link: "",
                        id: v4(),
                      },
                      {
                        text: "button 2",
                        link: "",
                        id: v4(),
                      },
                    ],
                    announcement: {
                      position: "above", // above, below
                      text: "",
                      link: "",
                    },
                  },
                  style: {
                    designName: "design1",
                    designSettings: {
                      logoColor: "none",
                      mobileMenuIcon: "icon-1", // icon-1, icon-2, icon-3
                      width: "fill", // fill , fit
                      sticky: false,
                      float: false,
                      shadow: false,
                      glass: false,
                      scrollIndicator: false,
                      autoHide: false,
                    },
                  },
                },
                {
                  id: v4(),
                  sectionName: "Banner",
                  content: {
                    label: "",
                    title: "ana mabdon",
                    subtitle:
                      "Eslam helps you build the best products for your customers. With our expertise and experience, we can help you take your ideas from concept to reality",
                    mediaType: "image",
                    imageSetting: { imageUrl: "", altText: "" },
                    videoSetting: { videoUrl: "" },
                    actionType: "buttons",
                    buttons: {
                      primaryButton: { text: "start your journey" },
                      secondaryButton: { text: "learn more" },
                    },
                  },
                  style: {
                    designName: "design1",
                    designSettings: {
                      titleSize: "l",
                      align: "center",
                      subtitleWidth: "50%",
                      height: "460px",
                      video: true,
                      leftTitlePosition: false,
                      leftTitleWidth: "50%",
                      showButtons: true,
                      sectionBackground: {
                        color: "none",
                        media: "",
                        height: "fit",
                        width: "100%",
                        spacing: "xl",
                        align: "center",
                      },
                      imageSetting: {
                        objectFit: "cover",
                        backgroundColor: "primary",
                        showImage: true,
                      },
                    },
                  },
                },
              ],
              pageSettings: {
                coverImage:
                  "https://images.unsplash.com/photo-1674062284636-c7b6b6c7a358?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDk5MjB8MHwxfHNlYXJjaHw4MXx8bW9iaWxlJTIwc2hvcHxlbnwwfHx8fDE3MDYyNjQxMzR8MA&ixlib=rb-4.0.3&q=80&w=1080",
                description:
                  "Shop for the latest mobile phones, tablets, and accessories at our online mobile shop. We offer a wide selection of products from top brands at competitive prices",
                isPublished: true,
                isVisibleInSearch: true,
                link: "home",
                pagePasswordButton: "Continue",
                seoTitle: "Mobile Shop | Buy & Sell New & Used Phones Online",
                showFooter: true,
                showHeader: true,
                title: "homepage",
                userEditedSlug: false,
              },
            },
            {
              pageId: v4(),
              sections: [
                {
                  id: v4(),
                  sectionName: "Banner",
                  content: {
                    label: "",
                    title: "beeeeeeeeeeeeeeed",
                    subtitle: "test page2 description for go site editor",
                    mediaType: "image",
                    imageSetting: { imageUrl: "", altText: "" },
                    videoSetting: { videoUrl: "" },
                    actionType: "buttons",
                    buttons: {
                      primaryButton: { text: "start your journey" },
                      secondaryButton: { text: "learn more" },
                    },
                  },
                  style: {
                    designName: "design1",
                    designSettings: {
                      titleSize: "l",
                      align: "center",
                      subtitleWidth: "50%",
                      height: "460px",
                      video: true,
                      leftTitlePosition: false,
                      leftTitleWidth: "50%",
                      showButtons: true,
                      sectionBackground: {
                        color: "none",
                        media: "",
                        height: "fit",
                        width: "100%",
                        spacing: "xl",
                        align: "center",
                      },
                      imageSetting: {
                        objectFit: "cover",
                        backgroundColor: "primary",
                        showImage: true,
                      },
                    },
                  },
                },
              ],
              pageSettings: {
                coverImage:
                  "https://images.unsplash.com/photo-1674062284636-c7b6b6c7a358?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDk5MjB8MHwxfHNlYXJjaHw4MXx8bW9iaWxlJTIwc2hvcHxlbnwwfHx8fDE3MDYyNjQxMzR8MA&ixlib=rb-4.0.3&q=80&w=1080",
                description:
                  "Shop for the latest mobile phones, tablets, and accessories at our online mobile shop. We offer a wide selection of products from top brands at competitive prices",
                isPublished: true,
                isVisibleInSearch: true,
                link: "home",
                pagePasswordButton: "Continue",
                seoTitle: "Mobile Shop | Buy & Sell New & Used Phones Online",
                showFooter: true,
                showHeader: true,
                title: "about",
                userEditedSlug: false,
              },
            },
          ],
          designSettings: {
            fonts: {
              titleFont: {
                fontFamily: "Space Grotesk",
                fontWeight: "600",
                fontFamilyUrl:
                  "https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj4PVksjNsFjTDJK.ttf",
              },
              bodyFont: {
                fontFamily: "Space Grotesk",
                fontWeight: "regular",
                fontFamilyUrl:
                  "https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUUsjNsFjTDJK.ttf",
              },
            },
            colors: {
              primary: "",
              primaryForGround: "",
            },
            borderRadius: ".5rem",
            width: {
              pages: 1400,
              fullWidthPage: false,
            },
          },
          selectedPallet: "default-theme",
        },
      ])
      .select();

    if (data) {
      setSites([data[0], ...(sites || [])]);
      setOpen(false);
      setSiteName("");
      setLoading(false);
      router.push(`/site/${data[0].siteId}/editor`);
    }
    if (siteError) {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
        <DialogHeader className="items-center">
          <DialogTitle>Site Name</DialogTitle>
        </DialogHeader>
        <div className="py-5">
          <Input
            id="siteName"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="Your site name or brand name"
            className="focus-visible:ring-0 focus-visible:ring-transparent"
          />
        </div>
        <DialogFooter className="gap-3">
          <DialogClose asChild>
            <Button variant="secondary" className="w-full">
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={loading}
            onClick={createSite}
            className="w-full disabled:opacity-40"
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateSiteModal;
