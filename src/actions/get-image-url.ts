import axios from "axios";

export const getScreenshotUrl = async (linkUrl: string) => {
  const screenshotOneApiKey = process.env.NEXT_PUBLIC_SCREENSHOT_ONE_API_KEY;
  const screenshotOneApiEndpoint =
    process.env.NEXT_PUBLIC_SCREENSHOT_ONE_API_ENDPOINT;

  try {
    const response = await axios.get(
      `${screenshotOneApiEndpoint}?url=${linkUrl}&access_key=${screenshotOneApiKey}`
    );

    if (response.status === 200) {
      const urlToDownloadFrom = response.config.url;
      return urlToDownloadFrom;
    } else {
      throw new Error(
        `Screenshot capture failed with status code: ${response.status}`
      );
    }
  } catch (error) {
    throw new Error(`Screenshot capture failed: ${error}`);
  }
};

import { utapi } from "uploadthing/server";

export const getUploadThingUrl = async (imageUrl: string) => {
  const myUrl = new URL(imageUrl);
  const result = await utapi.uploadFilesFromUrl(myUrl);

  return result;
};
