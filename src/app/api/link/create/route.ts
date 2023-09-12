import { NextResponse } from 'next/server';

import { getScreenshotUrl, getUploadThingUrl } from '@/actions/get-image-url';
import prismadb from '@/lib/prismadb';
import { currentUser } from '@clerk/nextjs';

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

    console.log('Entered api');

    if (type === 'desktop') {
      console.log('Entered desktop api');
      const desktopScreenshotUrl = await getScreenshotUrl(linkUrl, type);
      console.log(desktopScreenshotUrl);
      if (desktopScreenshotUrl) {
        console.log('Entered uploadthing');
        const uploadThingUrl = await getUploadThingUrl(desktopScreenshotUrl);
        console.log(uploadThingUrl);
        if (uploadThingUrl.data?.url) {
          console.log("create upload link");
          const newLink = await prismadb.link.create({
            data: {
              userId: user.id,
              imageDesktopFileKey: uploadThingUrl.data.key,
              imageDesktopUrl: uploadThingUrl.data?.url,
              linkUrl: linkUrl,
              projectId: projectId,
            },
          });
          console.log('Desktop: Success');
          return NextResponse.json(newLink);
        } else {
          console.log('Desktop: Failed 1');
          return new NextResponse('Fetch Error', { status: 500 });
        }
      } else {
        console.log('Desktop: Failed 2');
        return new NextResponse('Fetch Error', { status: 500 });
      }
    }
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
