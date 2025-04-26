import React, { useCallback, useEffect } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Shape, shapes } from "@/utlis/shapes";
import { FluidBoxSettings } from "@/types/sectionsTypes/fluid";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";

interface ShapesCarouselProps {
  fluidCardSettings: FluidBoxSettings;
  handleSettingChange: (settings: Partial<FluidBoxSettings>) => void;
}

const ShapesCarousel = ({
  fluidCardSettings,
  handleSettingChange,
}: ShapesCarouselProps) => {
  // Find the initial index for the selected shape
  const initialIndex = shapes.findIndex(
    (shape) => shape.id === fluidCardSettings.boxDesign
  );

  // Use the found index or default to 0
  const startIndex = initialIndex >= 0 ? initialIndex : 0;

  // Initialize Embla carousel with options and the startIndex
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
    dragFree: true,
    startIndex: startIndex,
  });

  // Ensure the selected shape is scrolled into view on component mount
  useEffect(() => {
    if (emblaApi && initialIndex >= 0) {
      // Small timeout to ensure the carousel is fully initialized
      setTimeout(() => {
        emblaApi.scrollTo(initialIndex);
      }, 0);
    }
  }, [emblaApi, initialIndex]);

  // Navigation handlers
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative border w-full flex items-center justify-center">
      {/* Left Arrow */}
      <div
        className="absolute left-0 h-full flex items-center justify-center px-1 bg-muted cursor-pointer select-none z-10"
        onClick={scrollPrev}
      >
        <ArrowLeft size={20} />
      </div>

      {/* Embla Carousel Container */}
      <div className="overflow-hidden w-72 py-1" ref={emblaRef}>
        <div className="flex">
          {/* Render all shapes as slides */}
          {shapes.map((shape) => {
            const isSelected = fluidCardSettings.boxDesign === shape.id;
            return (
              <div key={shape.id} className="flex-[0_0_70px] mx-2">
                <div
                  className={cn(
                    "w-14 h-14 flex items-center justify-center relative p-1 cursor-pointer",
                    {
                      "outline outline-primary outline-1": isSelected,
                    }
                  )}
                  onClick={() => {
                    handleSettingChange({
                      boxDesign: shape.id,
                      corners: {
                        bottomLeft: shape.defaultRounded,
                        bottomRight: shape.defaultRounded,
                        topLeft: shape.defaultRounded,
                        topRight: shape.defaultRounded,
                      },
                    });
                  }}
                >
                  {shape.component({})}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Arrow */}
      <div
        className="absolute right-0 h-full flex items-center justify-center px-1 bg-muted cursor-pointer select-none z-10"
        onClick={scrollNext}
      >
        <ArrowRight size={20} />
      </div>
    </div>
  );
};

export default ShapesCarousel;
