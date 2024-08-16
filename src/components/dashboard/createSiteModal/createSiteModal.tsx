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
import { ActiveUserType, CreateSite } from "@/utlis/auth-helper/client";
import { v4 } from "uuid";
interface CreateSiteModalProps {
  children: React.ReactNode;
  user: ActiveUserType;
}
function CreateSiteModal({ children, user }: CreateSiteModalProps) {
  const [siteName, setSiteName] = React.useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="items-center">
          <DialogTitle>Site Name</DialogTitle>
        </DialogHeader>
        <div className="py-5">
          <Input
            id="siteName"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="Your site name or brand name"
          />
        </div>
        <DialogFooter className="gap-3">
          <DialogClose asChild>
            <Button variant="secondary" className="w-full">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={() => {
              const settings = {
                email: user?.email,
                name: siteName,
                showMadeBy: true,
                _id: v4(),
              };
              CreateSite({
                _id: v4(),
                ownerId: user?.id,
                settings,
                pages: [
                  {
                    pageId: v4(),
                    sections: [
                      {
                        id: v4(),
                        sectionName: "Banner",
                        content: {
                          label: "",
                          title: "developer",
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
                      seoTitle:
                        "Mobile Shop | Buy & Sell New & Used Phones Online",
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
                          title: "test page2",
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
                      seoTitle:
                        "Mobile Shop | Buy & Sell New & Used Phones Online",
                      showFooter: true,
                      showHeader: true,
                      title: "about",
                      userEditedSlug: false,
                    },
                  },
                ],
              });
            }}
            className="w-full"
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateSiteModal;
