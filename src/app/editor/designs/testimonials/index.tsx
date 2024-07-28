import React from "react";
import Design1 from "./design1";
import Design2 from "./design2";

interface TestimonialProps {
  section: any;
}
function Testimonials({ section }: TestimonialProps) {
  const designs = {
    design1: Design1,
    design2: Design2,
  };
  //@ts-ignore
  const TestimonialSection = designs[section.style.designName];
  return <TestimonialSection section={section} />;
}

export default Testimonials;
