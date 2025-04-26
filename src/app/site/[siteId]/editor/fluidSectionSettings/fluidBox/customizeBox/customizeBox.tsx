import { Button } from "@/components/ui/button";
import { FluidBoxSettings } from "@/types/sectionsTypes/fluid";
import { ArrowLeft, Droplet, Scan, SquareDashedBottom } from "lucide-react";
import React, { useEffect, useState } from "react";
import ShapesCarousel from "../shapesCarousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { shapes } from "@/utlis/shapes";
import Background from "./background";
import Border from "./border";
import Corners from "./corners";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CustomizeBoxProps {
  fluidCardSettings: FluidBoxSettings;
  setView: React.Dispatch<React.SetStateAction<"shapes" | "settings">>;
  handleSettingChange: (settings: Partial<FluidBoxSettings>) => void;
}

function CustomizeBox({
  fluidCardSettings,
  setView,
  handleSettingChange,
}: CustomizeBoxProps) {
  const [tabValue, setTabValue] = useState("colors");
  const selectedShape = shapes.find(
    (shape) => shape.id === fluidCardSettings.boxDesign
  );

  useEffect(() => {
    if (!selectedShape?.withBorder || !selectedShape?.withCorners) {
      setTabValue("colors");
    }
  }, [selectedShape?.withBorder, selectedShape?.withCorners]);

  if (!selectedShape) return null;

  return (
    <div className="space-y-3 min-h-96">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setView("shapes")}>
          <ArrowLeft size={16} />
        </Button>
        <h3 className="text-sm font-medium">Box design</h3>
      </div>
      <ShapesCarousel
        fluidCardSettings={fluidCardSettings}
        handleSettingChange={handleSettingChange}
      />

      <Tabs
        value={tabValue}
        onValueChange={setTabValue}
        orientation="vertical"
        className="w-full flex"
      >
        <TabsList className="flex flex-col rounded-none h-full">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <TabsTrigger className="rounded-none h-12 w-12" value="colors">
                  <Droplet size={18} />
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                <p>Fill color & opacity</p>
                <TooltipArrow className="fill-muted" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {selectedShape?.withBorder && (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    className="rounded-none h-12 w-12"
                    value="border"
                  >
                    <SquareDashedBottom size={18} />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  <p>Border</p>
                  <TooltipArrow className="fill-muted" />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {selectedShape?.withCorners && (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    className="rounded-none h-12 w-12"
                    value="corners"
                  >
                    <Scan size={18} />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  <p>Corners</p>
                  <TooltipArrow className="fill-muted" />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </TabsList>
        <TabsContent value="colors" className="px-5 w-full">
          <Background
            selectedShape={selectedShape}
            fluidCardSettings={fluidCardSettings}
            handleSettingChange={handleSettingChange}
          />
        </TabsContent>
        {selectedShape?.withBorder && (
          <TabsContent value="border" className="px-5 w-full">
            <Border
              selectedShape={selectedShape}
              fluidCardSettings={fluidCardSettings}
              handleSettingChange={handleSettingChange}
            />
          </TabsContent>
        )}
        {selectedShape?.withCorners && (
          <TabsContent value="corners" className="px-5 w-full">
            <Corners
              selectedShape={selectedShape}
              fluidCardSettings={fluidCardSettings}
              handleSettingChange={handleSettingChange}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

export default CustomizeBox;
