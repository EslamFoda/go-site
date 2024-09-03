import { createApi } from "unsplash-js";

// Replace this with your actual Unsplash API key
const unsplashApiKey = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY!;

const unsplashClient = createApi({
  accessKey: unsplashApiKey,
});

export { unsplashClient };
