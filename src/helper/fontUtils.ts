export enum FontTypeEnum {
  Body = "Body",
  Headers = "Headers",
}

export type FontType = {
  fontFamily?: string;
  typeFace?: string;
  isItalic?: boolean;
  locale?: string;
  type?: FontTypeEnum;
  url?: string;
  weight?: string;
};

export type GoogleFontItem = {
  family: string;
  files: { [key: string]: string };
  kind: string;
  lastModified: string;
  subsets: string[];
  variants: string[];
  version: string;
};

export type FontFamilyOption = {
  label: string;
  value: string;
  variants: string[];
  files: { [key: string]: string };
};

export type FontVariantOption = {
  label: string;
  value: string;
  weight: string;
  italic: boolean;
};

export type FormValues = {
  headers: { family: FontFamilyOption; variant: FontVariantOption };
  body: { family: FontFamilyOption; variant: FontVariantOption };
};

export const FONT_VARIANTS = [
  "100",
  "100italic",
  "200",
  "200italic",
  "300",
  "300italic",
  "400",
  "400italic",
  "500",
  "500italic",
  "600",
  "600italic",
  "700",
  "700italic",
  "800",
  "800italic",
  "900",
  "900italic",
  "regular",
  "italic",
];

export const fontStyleLabel = {
  100: "Thin 100",
  "100italic": "Thin 100 italic",
  200: "Extra-light 200",
  "200italic": "Extra-light 200 italic",
  300: "Light 300",
  "300italic": "Light 300 italic",
  400: "Regular 400",
  "400italic": "Italic 400",
  500: "Medium 500",
  "500italic": "Medium 500 italic",
  600: "Semi-bold 600",
  "600italic": "Semi-bold 600 italic",
  700: "Bold 700",
  "700italic": "Bold 700 italic",
  800: "Extra-bold 800",
  "800italic": "Extra-bold 800 italic",
  900: "Black 900 ",
  "900italic": "Black 900 italic",
  regular: "Regular 400",
  italic: "Italic 400",
};

export const SITE_INITIAL_FONTS = {
  [FontTypeEnum.Headers]: {
    ar: "Almarai",
    en: "Inter",
  },
  [FontTypeEnum.Body]: {
    ar: "Almarai",
    en: "Inter",
  },
};

export const TEST_PHRASES = {
  en: { text: "Almost before we knew it, we had left the ground.", dir: "ltr" },
  ar: { text: "الحب سماء لا تمطر غير الاحلام.", dir: "rtl" },
  fr: {
    text: "Presque avant que nous le sachions, nous avions quitté le sol.",
    dir: "ltr",
  },
  tr: { text: "Neredeyse bilmeden önce, yeri terk etmiştik.", dir: "ltr" },
};

export function convertFontsDataToMap(fonts?: (any | null)[] | null): {
  [key: string]: any;
} {
  const chosenFonts = fonts?.filter((item) => item?.type);
  if (!chosenFonts?.length) return {};
  return chosenFonts.reduce(
    (acc: any, curr) => ({
      ...acc,
      [curr?.type!]: curr!,
    }),
    {}
  );
}

export function convertFontValuesToArray(values: FormValues, locale: string) {
  return Object.keys(values).map((key) => ({
    type: key as FontTypeEnum,
    // @ts-ignore
    fontFamily: values[key].family.value,
    // @ts-ignore
    typeFace: values[key].variant.value,
    // @ts-ignore
    weight: values[key].variant.weight,
    // @ts-ignore
    isItalic: values[key].variant.italic,
    // @ts-ignore
    url: createSelectedFontHref(values[key]),
    locale,
  }));
}

export function createFontFamilyOption(fontItem: GoogleFontItem) {
  // if (!fontItem) return;

  return {
    label: fontItem.family,
    value: fontItem.family,
    variants: fontItem.variants,
    files: fontItem.files,
  };
}

export function getFontWeight(variant?: string) {
  if (!variant) return "";
  return Number.isNaN(+variant.split("italic")[0])
    ? "400"
    : variant.split("italic")[0] || "400";
}

export function getRegularFontWeights(variants: string[]) {
  return variants
    .filter((variant) => !variant.includes("italic"))
    .map(getFontWeight);
}

export function getItalicFontWeights(variants: string[]) {
  return variants
    .filter((variant) => variant.includes("italic"))
    .map(getFontWeight);
}

export function createFontVariantOption(variant: string) {
  // if (!variant) return ;

  return {
    //@ts-ignore
    label: fontStyleLabel[variant] || variant,
    value: variant,
    italic: variant.includes("italic"),
    weight: getFontWeight(variant),
  };
}

export const FONT_VARIANT_OPTIONS = FONT_VARIANTS?.map(createFontVariantOption);

export function createFontQuery(font?: {
  family?: FontFamilyOption;
  variant?: FontVariantOption;
}) {
  if (!font?.family) return "";
  const fontFamily = font.family.value.replaceAll(" ", "+");
  if (!font?.variant) return `family=${fontFamily}`;
  const fontStyle = `${
    font.variant.italic
      ? `ital,wght@1,${font.variant.weight}`
      : `wght@${font.variant.weight}`
  }`;
  return `family=${fontFamily}:${fontStyle}`;
}

export function createFontsQuery(family: FontFamilyOption) {
  const fontFamily = family.value.replaceAll(" ", "+");
  const regularFontWeights = getRegularFontWeights(family.variants);
  const italicFontWeights = getItalicFontWeights(family.variants);
  const regularWeightsQuery = italicFontWeights.length
    ? regularFontWeights.join(";0,")
    : regularFontWeights.join(";");
  const italicWeightsQuery = italicFontWeights.join(";1,");

  const fontStyle = italicFontWeights.length
    ? `ital,wght@0,${regularWeightsQuery};1,${italicWeightsQuery}`
    : `wght@${regularWeightsQuery}`;
  return `family=${fontFamily}:${fontStyle}`;
}

export function createSelectedFontHref(font?: {
  family?: FontFamilyOption;
  variant?: FontVariantOption;
}) {
  if (!font?.family) return "";

  return `https://fonts.googleapis.com/css2?${createFontQuery(
    font
  )}&display=swap`;
}

export function createAllFontsHref(family: FontFamilyOption) {
  return `https://fonts.googleapis.com/css2?${createFontsQuery(
    family
  )}&display=swap`;
}

export function importGoogleFont(fontHref: string) {
  const link = document.createElement("link");
  link.href = fontHref;
  link.rel = "stylesheet";
  link.type = "text/css";
  document.head.appendChild(link);
}
