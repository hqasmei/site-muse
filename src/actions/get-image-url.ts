import axios from 'axios';



import { utapi } from 'uploadthing/server';





export const getScreenshotUrl = async (linkUrl: string, type: string) => {
  const screenlyApiKey = process.env.NEXT_PUBLIC_SCREENLY_API_KEY;
  const screenlyApiEndpoint = process.env.NEXT_PUBLIC_SCREENLY_API_ENDPOINT;
  const mobileWidth = 390;
  const desktopWidth = 1440;
  let windowWidth;

  switch (type) {
    case 'desktop':
      windowWidth = desktopWidth;
      break;
    case 'mobile':
      windowWidth = mobileWidth;
      break;
    default:
      windowWidth = desktopWidth;
      break;
  }

  try {
    if (screenlyApiEndpoint) {
      const response = await axios.post(
        screenlyApiEndpoint,
        {
          url: linkUrl,
          full_page: '1',
          timeout: 30,
          window_width: windowWidth,
          css_media_type: 'screen', 
          delay: '100',
        },
        {
          headers: {
            Authorization: `Bearer ${screenlyApiKey}`,
          },
        },
      );

      if (response.status === 201) {
        const urlToDownloadFrom = response.data.data.shot_url;
        return urlToDownloadFrom;
      } else {
        throw new Error(
          `Screenshot capture failed with status code: ${response.status}`,
        );
      }
    }
  } catch (error) {
    throw new Error(`Screenshot capture failed: ${error}`);
  }
};

export const getUploadThingUrl = async (imageUrl: string) => {
  const myUrl = new URL(imageUrl);
  const result = await utapi.uploadFilesFromUrl(myUrl);

  return result;
};