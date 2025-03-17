import React from "react";
import Design1 from "./design1";

interface GalleryProps {
  section: any;
  pageId: string;
  sectionIndex: number;
}
function Gallery({ section, pageId }: GalleryProps) {
  const designs = {
    design1: Design1,
  };

  //@ts-ignore
  const GallerySection = designs[section.style.designName];
  return (
    <>
      <GallerySection section={section} pageId={pageId} />
    </>
  );
}

export default Gallery;
