import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormFields } from "@/types/sectionsTypes/banner";
import { Check } from "@phosphor-icons/react";
import React from "react";
interface FieldProps {
  field: FormFields;
  updateFormFields: (fieldId: string, updates: Partial<FormFields>) => void;
}
function Field({ field, updateFormFields }: FieldProps) {
  return (
    <div
      key={field.id}
      className="flex items-center cursor-pointer divide-x-[1px] divide-muted-bg justify-between"
    >
      <Input
        placeholder={field.placeholder}
        value={field.value}
        onChange={(e) => updateFormFields(field.id, { value: e.target.value })}
        className="border-none focus:bg-transparent"
      />
      <div
        className="h-10 w-10 flex items-center select-none justify-center"
        onClick={() => {
          if (field.type === "email") return;
          updateFormFields(field.id, { active: !field.active });
        }}
      >
        <Check
          size={16}
          className={cn({
            hidden: !field.active,
          })}
        />
      </div>
    </div>
  );
}

export default Field;
