import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";
interface SwitchSettingProps {
  label: string;
  defaultChecked: boolean | undefined;
  onCheckedChange: (value: boolean) => void;
}
function SwitchSetting({
  label,
  defaultChecked,
  onCheckedChange,
}: SwitchSettingProps) {
  return (
    <div className="flex items-center justify-between p-3">
      <Label>{label}</Label>
      <Switch
        defaultChecked={defaultChecked}
        checked={defaultChecked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}

export default SwitchSetting;
