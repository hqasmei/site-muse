import { NextResponse } from 'next/server';

import { getScreenshotUrl, getUploadThingUrl } from '@/actions/get-image-url';
import prismadb from '@/lib/prismadb';
import { currentUser } from '@clerk/nextjs';

// Helper function to handle errors
function handleError(status: any, message: any) {
  return new NextResponse(message, { status });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { linkUrl, projectId, type } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!linkUrl) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    if (type === 'desktop') {
      const desktopScreenshotUrl = await getScreenshotUrl(linkUrl, type);

      if (desktopScreenshotUrl) {
        const uploadThingUrl = await getUploadThingUrl(desktopScreenshotUrl);

        if (uploadThingUrl.data?.url) {
          const newLink = await prismadb.link.create({
            data: {
              userId: user.id,
              linkUrl,
              projectId,
              imageDesktopFileKey: uploadThingUrl.data.key,
              imageDesktopUrl: uploadThingUrl.data.url,
            },
          });
          return NextResponse.json(newLink);
        }
      }
    } else if (type === 'mobile') {
      const mobileScreenshotUrl = await getScreenshotUrl(linkUrl, type);

      if (mobileScreenshotUrl) {
        const uploadThingUrl = await getUploadThingUrl(mobileScreenshotUrl);

        if (uploadThingUrl.data?.url) {
          const newLink = await prismadb.link.create({
            data: {
              userId: user.id,
              linkUrl,
              projectId,
              imageMobileFileKey: uploadThingUrl.data.key,
              imageMobileUrl: uploadThingUrl.data.url,
            },
          });

          return NextResponse.json(newLink);
        }
      }
    } else if (type === 'both') {
      const desktopScreenshotUrl = await getScreenshotUrl(linkUrl, 'desktop');
      const mobileScreenshotUrl = await getScreenshotUrl(linkUrl, 'mobile');

      if (desktopScreenshotUrl && mobileScreenshotUrl) {
        const uploadThingDesktopUrl =
          await getUploadThingUrl(desktopScreenshotUrl);
        const uploadThingMobileUrl =
          await getUploadThingUrl(mobileScreenshotUrl);

        if (uploadThingDesktopUrl.data?.url && uploadThingMobileUrl.data?.url) {
          const newLink = await prismadb.link.create({
            data: {
              userId: user.id,
              linkUrl,
              projectId,
              imageDesktopFileKey: uploadThingDesktopUrl.data.key,
              imageDesktopUrl: uploadThingDesktopUrl.data.url,
              imageMobileFileKey: uploadThingMobileUrl.data.key,
              imageMobileUrl: uploadThingMobileUrl.data.url,
            },
          });

          return NextResponse.json(newLink);
        }
      }
    }
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
