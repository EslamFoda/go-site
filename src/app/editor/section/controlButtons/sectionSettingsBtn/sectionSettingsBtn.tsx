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
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  updateEditorSections,
  updateSelectedSection,
} from "@/reduxStore/action";
import { v4 } from "uuid";
import { toast } from "sonner";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";

interface SectionSettingsBtnProps {
  sectionId: string;
  sectionIndex: number;
  pageId: string;
  sections:
    | EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>[]
    | undefined;
}
function SectionSettingsBtn({
  sectionId,
  sectionIndex,
  pageId,
  sections,
}: SectionSettingsBtnProps) {
  const dispatch = useAppDispatch();

  const duplicateSection = () => {
    if (!sections) return;
    const cloneSections = [...sections];
    const sectionToClone = cloneSections.find(
      (section) => section.id === sectionId
    );
    if (sectionToClone) {
      const newSection = { ...sectionToClone, id: v4() };
      cloneSections.splice(sectionIndex + 1, 0, newSection);
      dispatch(updateEditorSections(pageId, cloneSections));
      dispatch(updateSelectedSection(pageId, newSection.id));
    }
  };

  const deleteSection = () => {
    if (!sections) return;
    const deletedIndex = sections.findIndex(
      (section) => section.id === sectionId
    );

    // Find the section itself
    const deletedSection = sections[deletedIndex];

    dispatch(updateSelectedSection(pageId, null));
    const cloneSections = [...sections];
    const deleteSection = cloneSections.filter(
      (section) => section.id !== sectionId
    );
    dispatch(updateEditorSections(pageId, deleteSection));
    toast(`${deletedSection.sectionName} deleted`, {
      action: {
        label: "Undo",
        onClick: () => {
          // Insert the deleted section back at its original index
          const restoredSections = [...deleteSection];
          restoredSections.splice(deletedIndex, 0, deletedSection);
          dispatch(updateEditorSections(pageId, restoredSections));
        },
      },
    });
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
            <AlertDialogAction onClick={deleteSection}>
              delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default SectionSettingsBtn;
