import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Stars } from "@/icons/common";

interface SiteFormProps {
  siteName: string;
  setSiteName: (value: string) => void;
  siteDescription: string;
  setSiteDescription: (value: string) => void;
  onGenerate: () => void;
}

export function SiteForm({
  siteName,
  setSiteName,
  siteDescription,
  setSiteDescription,
  onGenerate,
}: SiteFormProps) {
  return (
    <>
      <div className="py-3 space-y-4">
        <Input
          id="siteName"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          placeholder="Enter brand name"
          className="focus-visible:ring-0 focus-visible:ring-transparent"
        />
        <Textarea
          id="description"
          value={siteDescription}
          onChange={(e) => setSiteDescription(e.target.value)}
          placeholder="Tell us about your brand... (e.g., We offer digital marketing services for small businesses)"
          className="resize-none !h-24"
        />
      </div>
      <div className="gap-3">
        <Button
          onClick={onGenerate}
          disabled={!siteName || !siteDescription}
          className="w-full gap-2"
        >
          <Stars />
          Generate Site
        </Button>
      </div>
    </>
  );
}
