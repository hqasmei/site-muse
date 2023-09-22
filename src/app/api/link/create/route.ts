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

    return NextResponse.json({ test: "test" });
    // if (type === 'desktop') {
    //   const desktopScreenshotUrl = await getScreenshotUrl(linkUrl, type);

    //   if (desktopScreenshotUrl) {
    //     const uploadThingUrl = await getUploadThingUrl(desktopScreenshotUrl);

    //     if (uploadThingUrl.data?.url) {
    //       const newLink = await prismadb.link.create({
    //         data: {
    //           userId: user.id,
    //           linkUrl,
    //           projectId,
    //           imageDesktopFileKey: uploadThingUrl.data.key,
    //           imageDesktopUrl: uploadThingUrl.data.url,
    //         },
    //       });
    //       return NextResponse.json(newLink);
    //     }
    //   }
    // }
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
