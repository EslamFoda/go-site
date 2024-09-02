import { createApi } from "unsplash-js";

// Replace this with your actual Unsplash API key
const unsplashApiKey = "gjivxJvo8q8wm0OFt-U3OWCBnxMutY9NOTPN9RfRVAM";

const unsplashClient = createApi({
  accessKey: unsplashApiKey,
});

export { unsplashClient };
