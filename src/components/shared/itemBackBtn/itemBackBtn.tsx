import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { closeDrawer } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import { ChevronLeft, Trash2 } from "lucide-react";
import React from "react";
interface ItemBackBtnProps {
  backBtnContainerClassName?: string;
  title: string;
  handleBack: (() => void) | undefined;
  handleDelete: () => void;
}
function ItemBackBtn({
  title,
  backBtnContainerClassName,
  handleBack,
  handleDelete,
}: ItemBackBtnProps) {
  const dispatch = useAppDispatch();
  const backBtnContainer = cn(
    "flex justify-between p-5 items-center gap-4  border-b-[1px] border-b-muted-bg mb-3",
    backBtnContainerClassName
  );
  return (
    <div className={backBtnContainer} onClick={handleBack}>
      <div className="flex gap-4 items-center cursor-pointer">
        <ChevronLeft size={18} />
        <Label className="cursor-pointer">{title}</Label>
      </div>
      <div className="flex gap-4 items-center">
        <div className="cursor-pointer" onClick={handleDelete}>
          <Trash2 size="18px" color="red" />
        </div>
        <div
          className="bg-foreground text-background px-2 rounded-full cursor-pointer hidden max-md:block"
          onClick={() => dispatch(closeDrawer())}
        >
          done
        </div>
      </div>
    </div>
  );
}

export default ItemBackBtn;
