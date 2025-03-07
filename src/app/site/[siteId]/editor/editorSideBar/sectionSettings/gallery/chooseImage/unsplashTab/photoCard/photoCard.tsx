import React from "react";
import { Check } from "lucide-react";
import { UnsplashImage } from "@/types/common";

interface PhotoCardProps {
  selectedImgId: string;
  image: UnsplashImage;
  handleUpdateUnsplash: (image: UnsplashImage) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({
  selectedImgId,
  image,
  handleUpdateUnsplash,
}) => {
  const isSelected = image.id === selectedImgId;

  return (
    <div
      key={image.id}
      className={`relative flex flex-col w-full h-20 overflow-hidden rounded-sm ${
        isSelected ? "border border-primary" : "border"
      }`}
      onClick={() => {
        handleUpdateUnsplash(image);
      }}
    >
      <div
        className={`absolute ${
          isSelected ? "" : "hidden"
        } bg-primary h-5 w-5 flex items-center justify-center rounded-full right-1 top-1`}
      >
        <Check size={14} className="stroke-background" />
      </div>

      <div
        className="w-full basis-4/5"
        style={{
          backgroundImage: `url(${image.urls.small})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <span className="basis-1/5 p-1 text-xs justify-self-center">
        {image.user.first_name}
      </span>
    </div>
  );
};

export default PhotoCard;
