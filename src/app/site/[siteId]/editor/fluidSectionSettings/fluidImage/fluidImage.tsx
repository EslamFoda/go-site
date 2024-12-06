import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { GridCard } from "@/types/sectionsTypes/fluid";
import React from "react";
interface FluidImageProps {
  fluidCard: GridCard | null;
  activePageId: string;
  selectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
}
function FluidImage({ fluidCard }: FluidImageProps) {
  return <div>iam FluidImage</div>;
}

export default FluidImage;
