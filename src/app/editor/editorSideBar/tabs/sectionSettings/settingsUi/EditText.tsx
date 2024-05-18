import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
interface EditTextProps {
  label: string;
  value: string;
  handleUpdate: (e: any) => void;
}
function EditText({ label, value, handleUpdate }: EditTextProps) {
  return (
    <div className="space-y-1 flex items-center justify-between">
      <Label htmlFor="title">{label}</Label>
      <Input
        className="w-4/6"
        id="title"
        value={value}
        onChange={handleUpdate}
      />
    </div>
  );
}

export default EditText;
