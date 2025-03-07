import React from "react";
import BackBtn from "@/components/shared/backBtn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { closeChooseImage } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import UnsplashTab from "./unsplashTab";
import { UnsplashImage } from "@/types/common";
import UploadImgTab from "./uploadImgTab";
import { Storage } from "@/reduxStore/types";
interface ChooseImageProps {
  selectedImgId: string;
  handleUpdateUnsplash: (image: UnsplashImage) => void;
  handleUpdateUploadedImg: (image: Storage) => void;
}
function ChooseImage({
  selectedImgId,
  handleUpdateUnsplash,
  handleUpdateUploadedImg,
}: ChooseImageProps) {
  const [tabValue, setTabValue] = React.useState("Uploads");
  const dispatch = useAppDispatch();

  return (
    <>
      <BackBtn label="Media" handleBack={() => dispatch(closeChooseImage())} />

      <Tabs onValueChange={setTabValue} value={tabValue} className="w-full">
        <TabsList className="grid m-5 grid-cols-2">
          <TabsTrigger value="Uploads">Uploads</TabsTrigger>
          <TabsTrigger value="Unsplash">Unsplash</TabsTrigger>
        </TabsList>
        <TabsContent className="px-5" value="Uploads">
          <UploadImgTab
            selectedImgId={selectedImgId}
            handleUpdateUploadedImg={handleUpdateUploadedImg}
          />
        </TabsContent>
        <TabsContent className="px-5" value="Unsplash">
          <UnsplashTab
            handleUpdateUnsplash={handleUpdateUnsplash}
            selectedImgId={selectedImgId}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default ChooseImage;
