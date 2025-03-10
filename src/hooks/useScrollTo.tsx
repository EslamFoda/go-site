import { scroller } from "react-scroll";
interface ScrollOptions {
  duration?: number;
  delay?: number;
  smooth?: boolean | string;
  offset?: number;
  containerId?: string;
  isDynamic?: boolean;
}
export const useScrollTo = () => {
  const scrollToElement = (
    elementId: string,
    options: ScrollOptions = {
      duration: 500,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -50,
    }
  ) => {
    scroller.scrollTo(elementId, options);
  };

  return { scrollToElement };
};
