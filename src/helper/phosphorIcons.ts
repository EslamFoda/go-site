import * as PhosphorIcons from "@phosphor-icons/react";

export const getPhosphorIcon = (iconName: string) => {
  return PhosphorIcons[
    iconName as keyof typeof PhosphorIcons
  ] as PhosphorIcons.Icon;
};
