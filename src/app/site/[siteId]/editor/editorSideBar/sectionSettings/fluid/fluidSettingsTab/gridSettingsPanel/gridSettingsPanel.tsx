import React from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { updateIsDragging } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";

interface GridSettings {
  cols: { lg: number; sm: number; xs: number };
  rowHeight: number;
  padding: [number, number];
}

interface GridSettingsProps {
  settings: GridSettings;
  onSettingsChange: (settings: GridSettings) => void;
}

const GridSettingsPanel: React.FC<GridSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  const dispatch = useAppDispatch();
  const handleChange = (key: string, value: number | [number, number]) => {
    let newSettings = { ...settings };

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

    onSettingsChange(newSettings);
    dispatch(updateIsDragging(true));
  };

  return (
    <Card className="w-full py-2">
      <CardContent className="space-y-6">
        <div>
          <Label>Columns (Large Screen)</Label>
          <Slider
            min={20}
            max={60}
            step={5}
            value={[settings.cols.lg]}
            onValueChange={(value) => handleChange("cols.lg", value[0])}
            onValueCommit={() => dispatch(updateIsDragging(false))}
            className="mt-2"
          />
          <div className="text-sm text-muted-foreground mt-1">
            {settings.cols.lg} columns
          </div>
        </div>

        <div>
          <Label>Columns (Small Screen)</Label>
          <Slider
            min={10}
            max={30}
            step={5}
            value={[settings.cols.sm]}
            onValueChange={(value) => handleChange("cols.sm", value[0])}
            onValueCommit={() => dispatch(updateIsDragging(false))}
            className="mt-2"
          />
          <div className="text-sm text-muted-foreground mt-1">
            {settings.cols.sm} columns
          </div>
        </div>

        <div>
          <Label>Columns (Extra Small Screen)</Label>
          <Slider
            min={5}
            max={20}
            step={5}
            value={[settings.cols.xs]}
            onValueChange={(value) => handleChange("cols.xs", value[0])}
            onValueCommit={() => dispatch(updateIsDragging(false))}
            className="mt-2"
          />
          <div className="text-sm text-muted-foreground mt-1">
            {settings.cols.xs} columns
          </div>
        </div>

        <div>
          <Label>Row Height (px)</Label>
          <Slider
            min={20}
            max={100}
            step={10}
            value={[settings.rowHeight]}
            onValueChange={(value) => handleChange("rowHeight", value[0])}
            onValueCommit={() => dispatch(updateIsDragging(false))}
            className="mt-2"
          />
          <div className="text-sm text-muted-foreground mt-1">
            {settings.rowHeight}px
          </div>
        </div>

        <div>
          <Label>Grid Padding (px)</Label>
          <Slider
            min={0}
            max={20}
            step={2}
            value={[settings.padding[0]]}
            onValueChange={(value) => handleChange("padding", value[0])}
            onValueCommit={() => dispatch(updateIsDragging(false))}
            className="mt-2"
          />
          <div className="text-sm text-muted-foreground mt-1">
            {settings.padding[0]}px
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GridSettingsPanel;
