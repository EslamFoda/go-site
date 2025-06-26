import React from "react";
import { Label } from "@/components/ui/label";
import { ArrowUpFromLine, Trash2 } from "lucide-react";
import { ImagePlaceHolder } from "@/icons/common";
import ItemBackBtn from "../itemBackBtn/itemBackBtn";


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
        <ItemBackBtn
          backBtnContainerClassName="px-0"
          title={backButtonLabel}
          handleBack={onBack}
          handleDelete={onImageDelete}
        />
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
