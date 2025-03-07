import React from "react";
import { Label } from "@/components/ui/label";
import { ArrowUpFromLine, ChevronLeft, Trash2 } from "lucide-react";
import { ImagePlaceHolder } from "@/icons/common";

interface ImageSelectorProps {
  title?: string;
  imageUrl?: string;
  onImageSelect: () => void;
  onImageDelete: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
  backButtonLabel?: string;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
  title = "Image",
  imageUrl,
  onImageSelect,
  onImageDelete,
  onBack,
  showBackButton = false,
  backButtonLabel = "Media",
}) => {
  return (
    <div className="space-y-2">
      {showBackButton && (
        <div
          className="flex justify-between p-5 items-center gap-4 border-b-[1px] border-b-muted-bg mb-3"
          onClick={onBack}
        >
          <div className="flex gap-4 items-center cursor-pointer">
            <ChevronLeft size={18} />
            <Label className="cursor-pointer">{backButtonLabel}</Label>
          </div>
          <div
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onImageDelete();
            }}
          >
            <Trash2 size="18px" color="red" />
          </div>
        </div>
      )}
      <div className="space-y-2">
        <div
          onClick={onImageSelect}
          className="space-y-1 cursor-pointer flex items-center justify-between"
        >
          <Label htmlFor="title">{title}</Label>
          <div className="w-4/6 border flex h-10 border-input rounded-md">
            <div className="basis-4/5 flex items-center justify-center h-full">
              {imageUrl ? (
                <div
                  className="h-5 w-5"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              ) : (
                <ImagePlaceHolder
                  fillColor="fill-muted"
                  width={20}
                  height={20}
                />
              )}
            </div>
            {imageUrl ? (
              <div
                className="flex items-center border-s justify-center basis-1/5 h-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onImageDelete();
                }}
              >
                <Trash2 className="stroke-destructive" size={16} />
              </div>
            ) : (
              <div className="flex items-center border-s justify-center basis-1/5 h-full">
                <ArrowUpFromLine size={18} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSelector;
