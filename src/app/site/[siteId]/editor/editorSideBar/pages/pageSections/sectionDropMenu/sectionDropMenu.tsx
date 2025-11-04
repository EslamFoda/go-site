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
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  copySection,
  openPagesTab,
  updateEditorSections,
  updateSelectedSection,
} from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { Ellipsis } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { v4 } from "uuid";
interface SectionDropMenuProps {
  sections: EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>[];
  sectionId: string;
  sectionIndex: number;
  pageId: string | string[];
}
function SectionDropMenu({
  sections,
  sectionId,
  sectionIndex,
  pageId,
}: SectionDropMenuProps) {
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
      // dispatch(updateSelectedSection(pageId, newSection.id));
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
    dispatch(openPagesTab());
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

  const handleCopy = () => {
    const section = sections?.find((section) => section.id === sectionId);
    if (section) {
      dispatch(copySection(section));
      toast.success(`Section ${section.sectionName} copied successfully`);
    }
  };

  return (
    <div>
      <AlertDialog>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger asChild>
              <div className="h-[30px] w-[30px] cursor-pointer flex items-center justify-center hover:bg-muted">
                <Ellipsis size={16} />
              </div>
            </MenubarTrigger>

            <MenubarContent align="end">
              <MenubarItem onClick={duplicateSection}>Duplicate</MenubarItem>

              <MenubarSeparator />
              <MenubarItem onClick={handleCopy}>Copy section</MenubarItem>

              <MenubarSeparator />
              <AlertDialogTrigger className="w-full text-start">
                <MenubarItem className="text-destructive-foreground !bg-destructive hover:!bg-destructive/50">
                  Delete
                </MenubarItem>
              </AlertDialogTrigger>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              section.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={deleteSection}
            >
              delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default SectionDropMenu;
