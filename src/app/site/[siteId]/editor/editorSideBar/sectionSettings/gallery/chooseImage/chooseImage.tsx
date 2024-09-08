import React from "react";
import BackBtn from "@/components/shared/backBtn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { closeChooseImage } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import UnsplashTab from "./unsplashTab";
import { Photo } from "@/types/sectionsTypes/gallery";
interface ChooseImageProps {
  handleUpdatePhoto: (updates: Partial<Photo>) => void;
}
function ChooseImage({ handleUpdatePhoto }: ChooseImageProps) {
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
          {/* Title font selector */}
          uploads
        </TabsContent>
        <TabsContent className="px-5" value="Unsplash">
          {/* Body font selector */}
          <UnsplashTab handleUpdatePhoto={handleUpdatePhoto} />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default ChooseImage;
