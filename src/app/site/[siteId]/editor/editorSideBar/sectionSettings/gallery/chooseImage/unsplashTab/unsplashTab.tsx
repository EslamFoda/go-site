import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { unsplashClient } from "@/helper/unsplash/unsplashClient";
import PhotoCard from "./photoCard";
import { useMotion } from "@/hooks/useMotion";
import { UnsplashImage } from "@/types/common";

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

interface UnsplashTabProps {
  selectedImgId: string;
  handleUpdate: (image: UnsplashImage) => void;
}

function UnsplashTab({ selectedImgId, handleUpdate }: UnsplashTabProps) {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [searchResults, setSearchResults] = useState<UnsplashImage[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { motion } = useMotion();

  const fetchUnsplashImages = async () => {
    if (page === 20) {
      setHasMore(false);
      return;
    }
    try {
      const unsplashResponse = await unsplashClient.photos.list({
        page,
        perPage: 30,
      });
      const newImages = unsplashResponse.response?.results as UnsplashImage[];
      const combinedImages = [...images, ...newImages];

      const uniqueImages = Array.from(
        new Map(combinedImages.map((image) => [image.id, image])).values()
      );

      setImages(uniqueImages);

      if (newImages.length < 30) {
        setHasMore(false);
      }

      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching Unsplash images:", error);
      setHasMore(false);
    }
  };

  const searchForImage = async (query: string) => {
    try {
      const unsplashResponse = await unsplashClient.search.getPhotos({
        query,
        page: 1,
      });
      setSearchResults(unsplashResponse.response?.results as UnsplashImage[]);
      setHasMore(false);
    } catch (error) {
      console.error("Error searching for image:", error);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      searchForImage(searchQuery);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setPage(1);
    setHasMore(true);
    fetchUnsplashImages();
  };

  useEffect(() => {
    if (!searchQuery) {
      fetchUnsplashImages();
    }
  }, [searchQuery]); // Depend on searchQuery to re-fetch images when search is cleared

  return (
    <div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search free photos"
          className="w-full appearance-none bg-background pl-8 mb-3 shadow-none"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
        />
        <Search
          className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground"
          size={10}
        />
        {searchQuery && (
          <X
            className="absolute right-2.5 top-3 h-4 w-4 text-muted-foreground cursor-pointer"
            onClick={clearSearch}
          />
        )}
      </div>
      <div
        className="overflow-y-auto"
        id="scrollableDiv"
        style={{ height: "calc(92vh - 220px)" }}
      >
        {searchQuery && searchResults.length > 0 ? (
          <motion.div
            className="grid grid-cols-3 gap-2"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {searchResults.map((image, i) => (
              <motion.div variants={childVariants} key={`${image.id} ${i}`}>
                <PhotoCard
                  image={image}
                  handleUpdate={handleUpdate}
                  selectedImgId={selectedImgId}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <InfiniteScroll
            dataLength={images.length}
            next={fetchUnsplashImages}
            hasMore={hasMore && !searchQuery} // Infinite scroll only for default images
            loader={hasMore && !searchQuery ? <h4>Loading...</h4> : null}
            scrollableTarget="scrollableDiv"
          >
            <motion.div
              className="grid grid-cols-3 gap-2"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {images.map((image, i) => (
                <motion.div variants={childVariants} key={`${image.id} ${i}`}>
                  <PhotoCard
                    image={image}
                    handleUpdate={handleUpdate}
                    selectedImgId={selectedImgId}
                  />
                </motion.div>
              ))}
            </motion.div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

export default UnsplashTab;
