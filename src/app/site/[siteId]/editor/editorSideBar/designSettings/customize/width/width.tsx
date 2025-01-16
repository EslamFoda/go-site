import React from "react";
import BackBtn from "@/components/shared/backBtn";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { updateDesignSettings } from "@/reduxStore/action";
import { Switch } from "@/components/ui/switch";

interface WidthProps {
  setOpenWidth: React.Dispatch<React.SetStateAction<boolean>>;
}

const updatePageContainerWidth = (width: number) => {
  const pageContainer = document.querySelector(
    ".page-container"
  ) as HTMLElement;
  if (pageContainer) {
    pageContainer.style.setProperty("--container-max-width", `${width}px`);
  }
};

const Width: React.FC<WidthProps> = ({ setOpenWidth }) => {
  const designSettings = useAppSelector(
    (state) => state.editor.present.designSettings
  );
  const dispatch = useAppDispatch();

  const handleSliderChange = (value: number[]) => {
    const maxWidth = value[0];
    dispatch(
      updateDesignSettings({
        ...designSettings,
        width: { ...designSettings.width, pages: maxWidth },
      })
    );
    updatePageContainerWidth(maxWidth);
  };

  const handleSwitchChange = (value: boolean) => {
    const pageContainer = document.querySelector(
      ".page-container"
    ) as HTMLElement;
    if (pageContainer) {
      pageContainer.style.setProperty(
        "--container-max-width",
        value ? "100%" : `${designSettings.width.pages}px`
      );
    }
    dispatch(
      updateDesignSettings({
        ...designSettings,
        width: { ...designSettings.width, fullWidthPage: value },
      })
    );
  };

  return (
    <div>
      <BackBtn label="Width" handleBack={() => setOpenWidth(false)} />
      <div className="px-5 space-y-4">
        {!designSettings.width.fullWidthPage && (
          <div className="space-y-1 flex items-center justify-between">
            <Label>Pages</Label>
            <div className="border-muted-bg flex border-solid border-[1px] rounded-sm h-10 w-4/6">
              <Slider
                customText={`${designSettings.width.pages}px`}
                value={[designSettings.width.pages]}
                min={650}
                max={1400}
                defaultValue={[designSettings.width.pages]}
                onValueChange={handleSliderChange}
              />
            </div>
          </div>
        )}
        <div className="flex flex-col w-full divide-y border border-solid border-muted-bg rounded-sm">
          <div className="flex w-full cursor-pointer h-10 px-2 items-center justify-between">
            <span className="text-sm">Full Width Pages</span>
            <Switch
              defaultChecked={designSettings.width.fullWidthPage}
              checked={designSettings.width.fullWidthPage}
              onCheckedChange={handleSwitchChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Width;
