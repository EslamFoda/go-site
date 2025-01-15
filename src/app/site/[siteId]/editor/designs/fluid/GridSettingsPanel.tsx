import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GridSettings {
  cols: { lg: number; sm: number; xs: number };
  rowHeight: number;
  padding: [number, number];
}

interface GridSettingsProps {
  settings: GridSettings;
  onSettingsChange: (settings: GridSettings) => void;
}

export const GridSettingsPanel: React.FC<GridSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (key: string, value: number | [number, number]) => {
    let newSettings = { ...localSettings };

    if (key === "cols.lg" || key === "cols.sm" || key === "cols.xs") {
      const [scope, size] = key.split(".");
      newSettings = {
        ...newSettings,
        cols: {
          ...newSettings.cols,
          [size]: value as number,
        },
      };
    } else if (key === "padding") {
      newSettings[key] = [value as number, value as number];
    } else {
      newSettings[key as keyof GridSettings] = value as any;
    }

    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Grid Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Columns (Large Screen)</Label>
          <Slider
            min={20}
            max={60}
            step={5}
            value={[localSettings.cols.lg]}
            onValueChange={(value) => handleChange("cols.lg", value[0])}
            className="mt-2"
          />
          <div className="text-sm text-muted-foreground mt-1">
            {localSettings.cols.lg} columns
          </div>
        </div>

        <div>
          <Label>Columns (Small Screen)</Label>
          <Slider
            min={10}
            max={30}
            step={5}
            value={[localSettings.cols.sm]}
            onValueChange={(value) => handleChange("cols.sm", value[0])}
            className="mt-2"
          />
          <div className="text-sm text-muted-foreground mt-1">
            {localSettings.cols.sm} columns
          </div>
        </div>

        <div>
          <Label>Columns (Extra Small Screen)</Label>
          <Slider
            min={5}
            max={20}
            step={5}
            value={[localSettings.cols.xs]}
            onValueChange={(value) => handleChange("cols.xs", value[0])}
            className="mt-2"
          />
          <div className="text-sm text-muted-foreground mt-1">
            {localSettings.cols.xs} columns
          </div>
        </div>

        <div>
          <Label>Row Height (px)</Label>
          <Slider
            min={20}
            max={100}
            step={10}
            value={[localSettings.rowHeight]}
            onValueChange={(value) => handleChange("rowHeight", value[0])}
            className="mt-2"
          />
          <div className="text-sm text-muted-foreground mt-1">
            {localSettings.rowHeight}px
          </div>
        </div>

        <div>
          <Label>Grid Padding (px)</Label>
          <Slider
            min={0}
            max={20}
            step={2}
            value={[localSettings.padding[0]]}
            onValueChange={(value) => handleChange("padding", value[0])}
            className="mt-2"
          />
          <div className="text-sm text-muted-foreground mt-1">
            {localSettings.padding[0]}px
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
