import React from "react";
import Design1 from "./design1";
import Design2 from "./design2";

interface TestimonialProps {
  section: any;
  pageId: string;
}
function Testimonials({ section, pageId }: TestimonialProps) {
  const designs = {
    design1: Design1,
    design2: Design2,
  };
  //@ts-ignore
  const TestimonialSection = designs[section.style.designName];
  return <TestimonialSection section={section} pageId={pageId} />;
}

export default Testimonials;
