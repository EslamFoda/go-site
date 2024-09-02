import { createApi } from "unsplash-js";

const unsplash = createApi({ accessKey: "MY_ACCESS_KEY" });

async function fetchImageFromUnsplash(photoId: string) {
  try {
    const result = await unsplash.photos.get({ photoId });
    const imageData = result.response;
    // Extract the image URL or other data from the imageData object
    const imageUrl = imageData?.urls.full; // Example: get the full-size image URL
    return imageUrl;
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
    throw error; // Handle the error appropriately (e.g., display an error message)
  }
}
