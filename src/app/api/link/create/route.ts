import { NextResponse } from 'next/server';

import { getScreenshotUrl, getUploadThingUrl } from '@/actions/get-image-url';
import prismadb from '@/lib/prismadb';
import { currentUser } from '@clerk/nextjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { linkUrl, projectId, desktopImageUrl, mobileImageUrl } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!linkUrl) {
      return new NextResponse('Missing required fields', { status: 400 });
    }
    var newDesktopKey;
    var newDesktopUrl;
    var newMobileKey;
    var newMobileUrl;
    if (desktopImageUrl !== '') {
      const uploadThingDesktop = await getUploadThingUrl(desktopImageUrl);
      newDesktopKey = uploadThingDesktop.data?.key;
      newDesktopUrl = uploadThingDesktop.data?.url;
    } else {
      newDesktopKey = '';
      newDesktopUrl = '';
    }
    if (mobileImageUrl !== '') {
      const uploadThingMobile = await getUploadThingUrl(mobileImageUrl);
      newMobileKey = uploadThingMobile.data?.key;
      newMobileUrl = uploadThingMobile.data?.url;
    } else {
      newMobileKey = '';
      newMobileUrl = '';
    }

    const newLink = await prismadb.link.create({
      data: {
        userId: user.id,
        linkUrl,
        projectId,
        imageDesktopFileKey: newDesktopKey,
        imageDesktopUrl: newDesktopUrl,
        imageMobileFileKey: newMobileKey,
        imageMobileUrl: newMobileUrl,
      },
    });

    return NextResponse.json(newLink);
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
