import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import React from "react";

interface HeightOrWidthSettingProps {
  label: string;
  value: number[];
  onValueChange: (value: number[]) => void;
  customText: string;
  isDesktop: boolean; // New prop for the icon state
  handleToggleSetting: () => void; // New prop for the toggle function
  min: number | undefined;
  max: number | undefined;
}

function HeightOrWidthSetting({
  label,
  customText,
  value,
  min,
  max,
  isDesktop,
  onValueChange,
  handleToggleSetting,
}: HeightOrWidthSettingProps) {
  return (
    <div className="space-y-1 flex items-center justify-between">
      <Label>{label}</Label>
      <div className="border-[#222] flex border-solid border-[1px] rounded-sm h-10 w-4/6">
        <div
          className="bg-[#222] hover:bg-[#333] cursor-pointer flex items-center justify-center h-full w-12 -me-1  rounded-s-sm"
          onClick={handleToggleSetting}
        >
          {isDesktop ? <ScreenIcon /> : <PhoneIcon />}
        </div>
        <Slider
          customText={customText}
          value={value}
          min={min}
          max={max}
          defaultValue={value}
          onValueChange={onValueChange}
        />
      </div>
    </div>
  );
}

export default HeightOrWidthSetting;

const ScreenIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M1.16602 2.08743C1.16602 1.75606 1.42718 1.48743 1.74935 1.48743H12.2493C12.5715 1.48743 12.8327 1.75606 12.8327 2.08743V9.28743C12.8327 9.6188 12.5715 9.88743 12.2493 9.88743H1.74935C1.42718 9.88743 1.16602 9.6188 1.16602 9.28743V2.08743Z"
        stroke="white"
        strokeWidth="1px"
      ></path>
      <path
        d="M4.66602 12.5126H9.33268"
        stroke="white"
        strokeWidth="1px"
      ></path>
    </svg>
  );
};

const PhoneIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
    >
      <path
        d="M7.27148 2.66008H9.60482M5.32704 0.666626H11.5493C12.4079 0.666626 13.1048 1.32369 13.1048 2.13329V13.8666C13.1048 14.677 12.4079 15.3333 11.5493 15.3333H5.32704C4.46837 15.3333 3.77148 14.677 3.77148 13.8666V2.13329C3.77148 1.32369 4.46837 0.666626 5.32704 0.666626Z"
        stroke="white"
        strokeWidth="1px"
      ></path>
    </svg>
  );
};
