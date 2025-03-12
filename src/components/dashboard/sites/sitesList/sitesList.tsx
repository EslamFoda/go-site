import React, { useState } from "react";
import SiteCard from "./siteCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
interface SitesListProps {
  sites: any[];
  setSites: React.Dispatch<React.SetStateAction<any[]>>;
}
function SitesList({ sites, setSites }: SitesListProps) {
  const [activeHeight, setActiveHeight] = useState("auto");

  const items = [
    "Short content",
    "This content is a bit longer and will change the height of the carousel item dynamically.",
    "A really long piece of content that takes up even more space than the previous ones, ensuring that the height of the carousel adapts correctly to the tallest item in view.",
  ];

  return (
    <div className="space-y-4">
      {sites.map((site) => {
        return <SiteCard site={site} key={site.siteId} setSites={setSites} />;
      })}
      <Carousel
        className="w-full max-w-lg"
      >
        <CarouselContent style={{ height: activeHeight }}>
          {items.map((text, index) => (
            <CarouselItem
              key={index}
              id={`carousel-item-${index}`}
              className="flex justify-center p-4"
            >
              <Card className="w-full">
                <CardContent className="p-4">{text}</CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default SitesList;
