import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
interface EditTextProps {
  label: string;
  value: string;
  inputType?: "text" | "textArea";
  handleUpdate: (e: any) => void;
}
function EditText({ label, value, inputType = "text", handleUpdate }: EditTextProps) {
  return (
    <div className="space-y-1 flex items-center justify-between">
      <Label htmlFor="title">{label}</Label>
      {inputType === "text" ? (
        <Input
          className="w-4/6"
          id="title"
          value={value}
          onChange={handleUpdate}
        />
      ) : (
        <Textarea
          className="w-4/6"
          id="title"
          value={value}
          onChange={handleUpdate}
        />
      )}
    </div>
  );
}

export default EditText;
