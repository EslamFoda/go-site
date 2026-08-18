"use client";

import { Button } from "@/components/ui/button";
import { SiteData } from "@/types/siteData";
import { ActiveUserType } from "@/utlis/auth-helper/client";
import { createClient } from "@/utlis/supabase/client";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton"; // Add this import
import CreateTemplate from "../createTemplate";
interface TemplateListProps {
  user: ActiveUserType;
}

function TemplateList({ user }: TemplateListProps) {
  const { theme } = useTheme();
  const [selectedTemplate, setSelectedTemplate] = useState<SiteData>();
  const [openCreateTemplateModal, setOpenCreateTemplateModal] = useState(false);

  const fetcher = async (key: string, theme: string | undefined) => {
    const supabase = createClient();
    const { data: templates, error } = await supabase
      .from("published_sites")
      .select()
      .eq("settings->>isTemplate", true);
    if (error) throw error;

    const cafeImg =
      theme === "dark"
        ? "https://res.cloudinary.com/dt92g80c6/image/upload/f_auto,q_auto/im3pcdkwxtgme3stpn2d"
        : "https://res.cloudinary.com/dt92g80c6/image/upload/f_auto,q_auto/eqrmherfkqr9wycalixb";
    const uiUXImage =
      theme === "dark"
        ? "https://res.cloudinary.com/dt92g80c6/image/upload/f_auto,q_auto/r99yffp346utwplkpu6c"
        : "https://res.cloudinary.com/dt92g80c6/image/upload/f_auto,q_auto/he9vcy01i5rla4hyi2zr";

    const entrepreneur =
      theme === "dark"
        ? "https://res.cloudinary.com/dt92g80c6/image/upload/v1743523011/entrepreneur.vexx.site__1_f5zuag.png"
        : "https://res.cloudinary.com/dt92g80c6/image/upload/v1743523010/entrepreneur.vexx.site__2_los7e9.png";

    const law =
      theme === "dark"
        ? "https://res.cloudinary.com/dt92g80c6/image/upload/v1743528639/law.vexx.site__xi4gwc.png"
        : "https://res.cloudinary.com/dt92g80c6/image/upload/v1743528640/law.vexx.site__1_fsefmk.png";

    const personal =
      theme === "dark"
        ? "https://res.cloudinary.com/dt92g80c6/image/upload/v1743540566/personal.vexx.site__pfe7pu.png"
        : "https://res.cloudinary.com/dt92g80c6/image/upload/v1743540588/personal.vexx.site__1_myrms2.png";

    const pets =
      theme === "dark"
        ? "https://res.cloudinary.com/dt92g80c6/image/upload/v1743597998/pets.vexx.site__zyvshx.png"
        : "https://res.cloudinary.com/dt92g80c6/image/upload/v1743597997/pets.vexx.site__1_r8z5g3.png";

    const imageMapper = {
      cafe: cafeImg,
      "ux-portfolio": uiUXImage,
      entrepreneur: entrepreneur,
      law: law,
      personal: personal,
      pets: pets,
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
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} className="h-80 flex rounded-md" />
        ))}
      </div>
    );
  }

  if (error) return <div>Error loading templates</div>;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
      {templates?.map((template) => (
        <div
          key={template.id}
          className="h-80 bg-muted relative rounded-md p-2 flex flex-col gap-y-1 group"
        >
          <span>{template.settings.name}</span>

          <div
            className={`${template.selectedPallet} relative flex-grow border border-primary overflow-hidden rounded-md`}
            style={
              {
                ...(template.selectedPallet === "custom"
                  ? { "--primary": template.designSettings.colors.primary }
                  : {}),
              } as React.CSSProperties
            }
          >
            <Image
              src={template.imageLink}
              alt={template.settings.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="hidden text-lg max-md:grid group-hover:grid grid-cols-2 gap-1 bg-muted p-2 absolute bottom-0 right-0 left-0 w-full">
            <Button
              size="sm"
              className="w-full bg-background text-foreground hover:bg-background/60 text-xs"
              onClick={() =>
                window.open(
                  `https://${template.domainName}.vexx.site`,
                  "_blank"
                )
              }
            >
              Preview
            </Button>
            <Button
              size="sm"
              className="w-full text-xs"
              onClick={() => {
                setOpenCreateTemplateModal(true);
                setSelectedTemplate(template);
              }}
            >
              Use Template
            </Button>
          </div>
        </div>
      ))}
      <CreateTemplate
        user={user}
        template={selectedTemplate as SiteData}
        openCreateTemplateModal={openCreateTemplateModal}
        setSelectedTemplate={setSelectedTemplate}
        setOpenCreateTemplateModal={setOpenCreateTemplateModal}
      />
    </div>
  );
}

export default TemplateList;
