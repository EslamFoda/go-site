import { scroller, animateScroll } from "react-scroll";

interface ScrollOptions {
  duration?: number;
  delay?: number;
  smooth?: boolean | string;
  offset?: number;
  containerId?: string;
  isDynamic?: boolean;
}

export const useScrollTo = () => {
  const defaultOptions: ScrollOptions = {
    duration: 500,
    delay: 0,
    smooth: "easeInOutQuart",
    offset: -50,
  };

  const scrollToElement = (elementId: string, options: ScrollOptions = {}) => {
    scroller.scrollTo(elementId, { ...defaultOptions, ...options });
  };

  const scrollToTop = (options: ScrollOptions = {}) => {
    animateScroll.scrollToTop({ ...defaultOptions, ...options });
  };

  const scrollToBottom = (options: ScrollOptions = {}) => {
    animateScroll.scrollToBottom({ ...defaultOptions, ...options });
  };

  return { scrollToElement, scrollToTop, scrollToBottom };
};
