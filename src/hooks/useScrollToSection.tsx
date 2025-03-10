// hooks/useScrollToSection.ts

import { useAppSelector } from "@/reduxStore/hooks";
import { useScrollTo } from "./useScrollTo";


interface ScrollOptions {
  duration?: number;
  delay?: number;
  smooth?: boolean | string;
  offset?: number;
}

export const useScrollToSection = () => {
  // Get the section index from Redux
  const { sectionIndex } = useAppSelector((state) => state.editor.present);
  // Get the scrollToElement function
  const { scrollToElement } = useScrollTo();

  // Create a specialized function with default parameters
  const scrollToCurrentSection = (
    options: ScrollOptions = {
      duration: 150,
      offset: -50,
      delay: 0,
      smooth: "easeInOutQuart",
    }
  ): void => {
    scrollToElement(`section-${sectionIndex}`, options);
  };

  return { scrollToCurrentSection };
};