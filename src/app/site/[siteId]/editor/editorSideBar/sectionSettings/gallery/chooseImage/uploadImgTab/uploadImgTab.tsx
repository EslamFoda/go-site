import { Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { updateStorage } from "@/reduxStore/action";
import { Photo } from "@/types/sectionsTypes/gallery";

interface UploadedImage {
  url: string;
  publicId: string;
}

interface UploadImgTabProps {
  handleUpdatePhoto: (updates: Partial<Photo>) => void;
}

function UploadImgTab({ handleUpdatePhoto }: UploadImgTabProps): JSX.Element {
  const { storage } = useAppSelector((state) => state.editor.present);
  console.log(storage, "storage");
  const dispatch = useAppDispatch();
  const [isUploading, setIsUploading] = useState<boolean>(false);
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
        { imgId: data.asset_id, url: data.secure_url },
      ];
      dispatch(updateStorage(newStorage));
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setIsUploading(false);
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

        {uploadedImage ? (
          <div className="relative w-full h-full">
            <Image
              src={uploadedImage.url}
              alt="Uploaded"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <span className="text-white text-sm">Change image</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 items-center justify-center text-center">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              {isUploading ? (
                <div className="animate-spin h-4 w-4 border-2 border-t-transparent border-blue-500 rounded-full" />
              ) : (
                <Upload size={18} />
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {isUploading ? "Uploading..." : "Add image"}
            </span>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
        )}
      </div>

      {/* Display list of uploaded images */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {storage.map((image) => (
          <div
            key={image.imgId}
            className="relative w-full h-24 border rounded-md overflow-hidden"
            onClick={() => {
              handleUpdatePhoto({ imgId: image.imgId, url: image.url });
            }}
          >
            <Image
              src={image.url}
              alt="Uploaded"
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadImgTab;
