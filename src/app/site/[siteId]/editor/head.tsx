"use client";
import { useAppSelector } from "@/reduxStore/hooks";
import React from "react";

function Head() {
  const { designSettings } = useAppSelector((state) => state.editor);
  const { bodyFont, titleFont } = designSettings.fonts;
  return (
    <head>
      <link rel="preconnect" href="https://maps.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com/"></link>
      <style
        dangerouslySetInnerHTML={{
          __html: `
    ${
      titleFont.fontFamilyUrl
        ? `
      @font-face {
        font-family: ${titleFont.fontFamily}-title;
        src: url("${titleFont.fontFamilyUrl}");
      }
    `
        : ""
    }
  `,
        }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
    ${
      bodyFont.fontFamilyUrl
        ? `
      @font-face {
        font-family: ${bodyFont.fontFamily}-body;
        src: url("${bodyFont.fontFamilyUrl}");
      }
    `
        : ""
    }
  `,
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
    ${
      titleFont.fontFamilyUrl && titleFont.fontFamily
        ? `
      .page-container h1,
      .page-container h2,
      .page-container h3,
      .page-container h4,
      .page-container h5,
      .page-container h6,
      .text-title {
        font-family: "${titleFont.fontFamily}-title";
      }
    `
        : ""
    }
  `,
        }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
    ${
      bodyFont.fontFamilyUrl && bodyFont.fontFamily
        ? `
      .page-container span,
      .page-container p,
      .page-container div,
      .text-body {
        font-family: "${bodyFont.fontFamily}-body";
      }
    `
        : ""
    }
  `,
        }}
      />
    </head>
  );
}

export default Head;
