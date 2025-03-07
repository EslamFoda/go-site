import { Upload, Trash2, Check } from "lucide-react";
import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { updateStorage } from "@/reduxStore/action";
import { Button } from "@/components/ui/button";
import { Storage } from "@/reduxStore/types";
import { useMotion } from "@/hooks/useMotion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface UploadedImage {
  url: string;
  publicId: string;
}

interface UploadImgTabProps {
  selectedImgId: string;
  handleUpdateUploadedImg: (image: Storage) => void;
}

function UploadImgTab({
  selectedImgId,
  handleUpdateUploadedImg,
}: UploadImgTabProps): JSX.Element {
  const { storage } = useAppSelector((state) => state.editor.present);
  const dispatch = useAppDispatch();
  const { motion, AnimatePresence } = useMotion();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(
    null
  );

  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setError(null);
    setIsUploading(true);

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      setError("Please upload only JPEG or PNG images");
      setIsUploading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "my-upload");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dxrdyke2n/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || "Upload failed");
      }

      setUploadedImage({
        url: data.secure_url,
        publicId: data.public_id,
      });

      const newStorage = [
        ...storage,
        {
          id: data.asset_id,
          url: data.secure_url,
          publicId: data.public_id, // Store the publicId for deletion
        },
      ];
      dispatch(updateStorage(newStorage));
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (
    imgId: string,
    publicId?: string
  ): Promise<void> => {
    if (!publicId) return;

    setIsDeleting(imgId);
    setError(null);

    try {
      // Call your Next.js API route
      const response = await fetch("/api/delete-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete image");
      }

      // Update the Redux store by removing the deleted image
      const newStorage = storage.filter((image) => image.id !== imgId);
      dispatch(updateStorage(newStorage));

      // Reset uploadedImage state if it's the deleted image
      if (
        uploadedImage &&
        uploadedImage.url === storage.find((img) => img.id === imgId)?.url
      ) {
        setUploadedImage(null);
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError(err instanceof Error ? err.message : "Failed to delete image");
    } finally {
      setIsDeleting(null);
    }
  };
  return (
    <div>
      <div
        className="flex justify-center items-center h-32 border cursor-pointer relative overflow-hidden"
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/jpeg, image/png"
        />

        <div className="flex flex-col gap-2 items-center justify-center text-center">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            {isUploading ? (
              <div className="animate-spin h-4 w-4 border-2 border-t-transparent border-primary rounded-full" />
            ) : (
              <Upload size={18} />
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {isUploading ? "Uploading..." : "Add image"}
          </span>
          {error && <p className="text-xs text-destructive mt-1">{error}</p>}
        </div>
      </div>

      {/* Display list of uploaded images */}
      <div
        className="overflow-y-auto mt-4"
        style={{ height: "calc(92vh - 280px)" }}
      >
        <motion.div
          className="grid grid-cols-3 gap-2"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          <AnimatePresence>
            {storage.map((image: Storage) => (
              <motion.div
                key={image.id}
                layout
                variants={childVariants}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "tween" }}
                className={`relative flex flex-col w-full h-20 overflow-hidden cursor-pointer rounded-sm group ${
                  selectedImgId === image.id
                    ? "border border-primary"
                    : "border"
                }`}
                onClick={() => {
                  handleUpdateUploadedImg(image);
                }}
              >
                <div
                  className="w-full basis-full"
                  style={{
                    backgroundImage: `url(${image.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div
                  className={`absolute ${
                    selectedImgId === image.id ? "" : "hidden"
                  } bg-primary h-6 w-6 flex items-center justify-center rounded-full left-1 top-1`}
                >
                  <Check size={16} className="stroke-primary-foreground" />
                </div>
                {/* Delete button */}
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteImage(image.id, image.publicId);
                  }}
                  title="Delete image"
                  disabled={isDeleting === image.id}
                >
                  {isDeleting === image.id ? (
                    <div className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default UploadImgTab;
