import { NextResponse } from 'next/server';

import { getScreenshotUrl, getUploadThingUrl } from '@/actions/get-image-url';
import prismadb from '@/lib/prismadb';
import { currentUser } from '@clerk/nextjs';

// Helper function to handle errors
function handleError(status: any, message: any) {
  return new NextResponse(message, { status });
}

// Helper function to create a link
async function createLink(
  userId: string,
  imageDesktopFileKey: string,
  imageDesktopUrl: string,
  linkUrl: string,
  projectId: string,
) {
  return prismadb.link.create({
    data: {
      userId,
      imageDesktopFileKey,
      imageDesktopUrl,
      linkUrl,
      projectId,
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { linkUrl, projectId, type } = body;

    if (!user || !user.id || !user.firstName) {
      return handleError(401, 'Unauthorized');
    }

    if (!linkUrl) {
      return handleError(400, 'Missing required fields');
    }

    console.log('Entered api');

    if (type === 'desktop') {
      console.log('Entered desktop api');
      const desktopScreenshotUrl = await getScreenshotUrl(linkUrl, type);
      console.log(desktopScreenshotUrl);

      if (desktopScreenshotUrl) {
        console.log('Entered uploadThing');
        const uploadThingUrl = await getUploadThingUrl(desktopScreenshotUrl);

        if (uploadThingUrl.data?.url) {
          console.log('Create upload link');
          const newLink = await createLink(
            user.id,
            uploadThingUrl.data.key,
            uploadThingUrl.data?.url,
            linkUrl,
            projectId,
          );
          console.log('Desktop: Success');
          return NextResponse.json(newLink);
        } else {
          console.log('Desktop: Failed 1');
          return handleError(500, 'Fetch Error');
        }
      } else {
        console.log('Desktop: Failed 2');
        return handleError(500, 'Fetch Error');
      }
    }
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return handleError(500, 'Internal Error');
  }
}
