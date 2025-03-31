"use client";

import { Button } from "@/components/ui/button";
import { SiteData } from "@/types/siteData";
import { ActiveUserType } from "@/utlis/auth-helper/client";
import { createClient } from "@/utlis/supabase/client";
import { useTheme } from "next-themes";
import React from "react";
import useSWR from "swr";
import Image from "next/image";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";

interface TemplateListProps {
  user: ActiveUserType;
}

function TemplateList({ user }: TemplateListProps) {
  const { theme } = useTheme();
  const router = useRouter();

  const fetcher = async (key: string, theme: string | undefined) => {
    const supabase = createClient();
    const { data: templates, error } = await supabase
      .from("published_sites")
      .select()
      .eq("settings->>isTemplate", true);
    if (error) throw error;

    // Add imageLink to each template based on current theme
    const cafeImg =
      theme === "dark"
        ? "https://res.cloudinary.com/dt92g80c6/image/upload/f_auto,q_auto/im3pcdkwxtgme3stpn2d"
        : "https://res.cloudinary.com/dt92g80c6/image/upload/f_auto,q_auto/eqrmherfkqr9wycalixb";
    const uiUXImage =
      theme === "dark"
        ? "https://res.cloudinary.com/dt92g80c6/image/upload/f_auto,q_auto/r99yffp346utwplkpu6c"
        : "https://res.cloudinary.com/dt92g80c6/image/upload/f_auto,q_auto/he9vcy01i5rla4hyi2zr";

    const imageMapper = {
      cafe: cafeImg,
      "ux-portfolio": uiUXImage,
    };

    const templatesWithImages = templates.map((template) => ({
      ...template,
      imageLink:
        imageMapper[template.settings.name as keyof typeof imageMapper] || "",
    }));

    return templatesWithImages as SiteData[];
  };

  const {
    data: templates,
    error,
    isLoading,
  } = useSWR(["templates", theme], ([key, theme]) => fetcher(key, theme), {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  if (isLoading) {
    return <div>Loading templates...</div>;
  }

  if (error) {
    console.error("Error fetching templates:", error);
    return <div>Error loading templates</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {templates?.map((template) => (
        <div
          key={template.id}
          className="h-80 bg-muted relative rounded-md p-2 flex flex-col gap-y-1 group"
        >
          <span>{template.settings.name}</span>

          <div className="relative flex-grow overflow-hidden rounded-md">
            <Image
              src={template.imageLink}
              alt={template.settings.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="hidden group-hover:flex gap-1 bg-muted p-2 absolute bottom-0 right-0 left-0 w-full">
            <Button
              size="sm"
              className="w-full bg-background text-foreground hover:bg-background/60"
              onClick={() =>
                window.open(
                  `https://${template.domainName}.vixx.site`,
                  "_blank"
                )
              }
            >
              Preview
            </Button>
            <Button
              size="sm"
              className="w-full"
              onClick={async () => {
                const homePageId = v4();
                const siteId = v4();
                const supabase = createClient();
                const { data, error } = await supabase
                  .from("sites")
                  .insert([
                    {
                      settings: {
                        email: user?.email,
                        favicon: "",
                        homePage: homePageId,
                        isTemplate: false,
                        showMadeBy: true,
                        name: "test",
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
                router.push(`/site/${siteId}/editor`);
              }}
            >
              Use Template
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TemplateList;
