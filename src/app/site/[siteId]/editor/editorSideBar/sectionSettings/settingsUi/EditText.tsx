import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useScrollTo } from "@/hooks/useScrollTo";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { useAppSelector } from "@/reduxStore/hooks";
import React from "react";
interface EditTextProps {
  label: string;
  value: string;
  inputType?: "text" | "textArea";
  handleUpdate: (e: any) => void;
  placeholder?: string;
  id: string;
}
function EditText({
  label,
  value,
  inputType = "text",
  id,
  placeholder,
  handleUpdate,
}: EditTextProps) {
  const { scrollToCurrentSection } = useScrollToSection();

  const onFocus = () => {
    scrollToCurrentSection();
  };
  return (
    <div className="space-y-1 flex items-center justify-between">
      <Label htmlFor="title">{label}</Label>
      {inputType === "text" ? (
        <Input
          className="w-4/6"
          placeholder={placeholder}
          value={value}
          onChange={handleUpdate}
          onFocus={onFocus}
        />
      ) : (
        <Textarea
          className="w-4/6"
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={handleUpdate}
          onFocus={onFocus}
        />
      )}
    </div>
  );
}

export default EditText;
