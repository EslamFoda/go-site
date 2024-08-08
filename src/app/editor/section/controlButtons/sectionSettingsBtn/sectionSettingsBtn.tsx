import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Ellipsis } from "lucide-react";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  updateEditorSections,
  updateSelectedSection,
} from "@/reduxStore/action";
import { v4 } from "uuid";
import { toast } from "sonner";

interface SectionSettingsBtnProps {
  sectionId: string;
  sectionIndex: number;
}
function SectionSettingsBtn({
  sectionId,
  sectionIndex,
}: SectionSettingsBtnProps) {
  const editorSections = useAppSelector(
    (state) => state.editor.editor.sections
  );
  const dispatch = useAppDispatch();

  const duplicateSection = () => {
    const cloneSections = [...editorSections];
    const sectionToClone = cloneSections.find(
      (section) => section.id === sectionId
    );
    if (sectionToClone) {
      const newSection = { ...sectionToClone, id: v4() };
      cloneSections.splice(sectionIndex + 1, 0, newSection);
      dispatch(updateEditorSections(cloneSections));
      dispatch(updateSelectedSection(newSection.id));
    }
  };

  return (
    <div>
      <AlertDialog>
        <TooltipProvider>
          <Menubar>
            <MenubarMenu>
              <Tooltip delayDuration={100}>
                <MenubarTrigger asChild>
                  <TooltipTrigger asChild>
                    <div className="h-[30px] w-[30px] flex items-center justify-center hover:bg-muted">
                      <Ellipsis size={16} />
                    </div>
                  </TooltipTrigger>
                </MenubarTrigger>
                <TooltipContent>
                  <span>Settings</span>
                  <TooltipArrow className="fill-secondary" />
                </TooltipContent>
              </Tooltip>
              <MenubarContent align="end">
                <MenubarItem onClick={duplicateSection}>duplicate</MenubarItem>
                <MenubarSeparator />
                <AlertDialogTrigger className="w-full text-start">
                  <MenubarItem className="text-destructive">Delete</MenubarItem>
                </AlertDialogTrigger>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </TooltipProvider>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const deletedIndex = editorSections.findIndex(
                  (section) => section.id === sectionId
                );

                // Find the section itself
                const deletedSection = editorSections[deletedIndex];

                dispatch(updateSelectedSection(null));
                const cloneSections = [...editorSections];
                const deleteSection = cloneSections.filter(
                  (section) => section.id !== sectionId
                );
                dispatch(updateEditorSections(deleteSection));
                toast(`${deletedSection.sectionName} deleted`, {
                  action: {
                    label: "Undo",
                    onClick: () => {
                      // Insert the deleted section back at its original index
                      const restoredSections = [...deleteSection];
                      restoredSections.splice(deletedIndex, 0, deletedSection);
                      dispatch(updateEditorSections(restoredSections));
                    },
                  },
                });
              }}
            >
              delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default SectionSettingsBtn;
