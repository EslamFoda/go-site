import React from "react";
import { Check } from "lucide-react";
import { Photo } from "@/types/sectionsTypes/gallery";
import { useAppSelector } from "@/reduxStore/hooks";

interface PhotoCardProps {
  image: {
    id: string;
    urls: {
      small: string;
      regular: string;
    };
    user: {
      first_name: string;
    };
  };
  handleUpdatePhoto: (updates: Partial<Photo>) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ image, handleUpdatePhoto }) => {
  const selectedPhoto = useAppSelector((state) => state.editor.selectedItem);
  const isSelected = image.id === selectedPhoto?.id;

  return (
    <div
      key={image.id}
      className={`relative flex flex-col w-full h-20 overflow-hidden rounded-sm ${
        isSelected ? "border border-primary" : "border"
      }`}
      onClick={() => {
        handleUpdatePhoto({
          id: image.id,
          url: image.urls.regular,
        });
      }}
    >
      {isSelected && (
        <div className="absolute bg-primary h-5 w-5 flex items-center justify-center rounded-full right-1 top-1">
          <Check size={14} className="stroke-background" />
        </div>
      )}
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
