"use client";
import { useAppSelector } from "@/reduxStore/hooks";
import React, { useEffect, useState } from "react";

function FontLoader() {
  const { designSettings } = useAppSelector((state) => state.editor.present);
  const { bodyFont, titleFont } = designSettings.fonts;

  // Use state to track client-side rendering
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true once component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render styles on the client to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* Body Font Face Definition */}
      {bodyFont.fontFamilyUrl && (
        <style type="text/css">
          {`
            @font-face {
              font-family: '${bodyFont.fontFamily}-body';
              src: url('${bodyFont.fontFamilyUrl}') format('truetype');
              font-weight: normal;
              font-style: normal;
              font-display: swap;
            }
            
            .page-container span,
            .page-container p,
            .page-container div,
            .text-body {
              font-family: '${bodyFont.fontFamily}-body', sans-serif;
            }
          `}
        </style>
      )}

      {/* Title Font Face Definition */}
      {titleFont.fontFamilyUrl && (
        <style type="text/css">
          {`
            @font-face {
              font-family: '${titleFont.fontFamily}-title';
              src: url('${titleFont.fontFamilyUrl}') format('truetype');
              font-weight: normal;
              font-style: normal;
              font-display: swap;
            }
            
            .page-container h1,
            .page-container h2,
            .page-container h3,
            .page-container h4,
            .page-container h5,
            .page-container h6,
            .text-title {
              font-family: '${titleFont.fontFamily}-title', sans-serif;
            }
          `}
        </style>
      )}
    </>
  );
}

export default FontLoader;