import { utapi } from 'uploadthing/server';

export const deleteUploadThingUrl = async (fileKey: string) => {
  const result = await utapi.deleteFiles(fileKey);

  return result;
};
