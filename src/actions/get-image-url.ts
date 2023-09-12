import axios from 'axios';

import { utapi } from 'uploadthing/server';

export const getScreenshotUrl = async (linkUrl: string, type: string) => {
  const screenlyApiKey = process.env.NEXT_PUBLIC_SCREENLY_API_KEY;
  const screenlyApiEndpoint = process.env.NEXT_PUBLIC_SCREENLY_API_ENDPOINT;
  const mobileWidth = 390;
  const desktopWidth = 1440;
  console.log('get Screenshot');
  if (type == 'desktop') {
    try {
      console.log('get desktop screenshot');
      if (screenlyApiEndpoint) {
        const response = await axios.post(
          screenlyApiEndpoint,
          {
            url: linkUrl,
            full_page: '1',
            timeout: 60,
            window_width: desktopWidth,
            css_media_type: 'screen',
          },
          {
            headers: {
              Authorization: `Bearer ${screenlyApiKey}`,
            },
          },
        );

        if (response.status === 201) {
          const urlToDownloadFrom = response.data.data.shot_url;
          console.log('finished desktop screenshot');
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
  } else if (type == 'mobile') {
    try {
      if (screenlyApiEndpoint) {
        const response = await axios.post(
          screenlyApiEndpoint,
          {
            url: linkUrl,
            full_page: '1',
            timeout: 60,
            window_width: mobileWidth,
            css_media_type: 'screen',
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
  }
};

export const getUploadThingUrl = async (imageUrl: string) => {
  const myUrl = new URL(imageUrl);
  const result = await utapi.uploadFilesFromUrl(myUrl);

  return result;
};
