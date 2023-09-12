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

    switch (type) {
      case 'desktop':
        // Code for "desktop" type
        console.log('Entered desktop api');
        const desktopScreenshotUrl = await getScreenshotUrl(linkUrl, type);
        if (desktopScreenshotUrl) {
          const uploadThingUrl = await getUploadThingUrl(desktopScreenshotUrl);
          if (uploadThingUrl.data?.url) {
            const newLink = await prismadb.link.create({
              data: {
                userId: user.id,
                imageDesktopFileKey: uploadThingUrl.data.key,
                imageDesktopUrl: uploadThingUrl.data?.url,
                imageMobileFileKey: '',
                imageMobileUrl: '',
                linkUrl: linkUrl,
                projectId: projectId,
              },
            });
            console.log('Desktop: Sucess');

            return NextResponse.json(newLink);
          } else {
            console.log('Desktop: Failed 1');
            return new NextResponse('Fetch Error', { status: 500 });
          }
        } else {
          console.log('Desktop: Failed 2');
          return new NextResponse('Fetch Error', { status: 500 });
        }

      case 'mobile':
        // Code for "mobile" type
        const mobileScreenshotUrl = await getScreenshotUrl(linkUrl, type);
        if (mobileScreenshotUrl) {
          const uploadThingUrl = await getUploadThingUrl(mobileScreenshotUrl);
          if (uploadThingUrl.data?.url) {
            const newLink = await prismadb.link.create({
              data: {
                userId: user.id,
                imageDesktopFileKey: '',
                imageDesktopUrl: '',
                imageMobileFileKey: uploadThingUrl.data.key,
                imageMobileUrl: uploadThingUrl.data?.url,
                linkUrl: linkUrl,
                projectId: projectId,
              },
            });
            console.log('Mobile: Sucess');
            return NextResponse.json(newLink);
          } else {
            console.log('Mobile: Sucess');
            return new NextResponse('Fetch Error', { status: 500 });
          }
        } else {
          console.log('Mobile: Sucess');
          return new NextResponse('Fetch Error', { status: 500 });
        }

      case 'both':
        // Code for "both" type
        const desktopScreenshotUrl1 = await getScreenshotUrl(
          linkUrl,
          'desktop',
        );
        const mobileScreenshotUrl1 = await getScreenshotUrl(linkUrl, 'mobile');
        if (desktopScreenshotUrl1 && mobileScreenshotUrl1) {
          const uploadThingUrl1 = await getUploadThingUrl(
            desktopScreenshotUrl1,
          );
          const uploadThingUrl2 = await getUploadThingUrl(mobileScreenshotUrl1);
          if (uploadThingUrl1.data?.url && uploadThingUrl2.data?.url) {
            const newLink = await prismadb.link.create({
              data: {
                userId: user.id,
                imageDesktopFileKey: uploadThingUrl1.data.key,
                imageDesktopUrl: uploadThingUrl1.data?.url,
                imageMobileFileKey: uploadThingUrl2.data.key,
                imageMobileUrl: uploadThingUrl2.data?.url,
                linkUrl: linkUrl,
                projectId: projectId,
              },
            });
            console.log('Both: Sucess');
            return NextResponse.json(newLink);
          } else {
            console.log('Both: Sucess');
            return new NextResponse('Fetch Error', { status: 500 });
          }
        } else {
          console.log('Both: Sucess');
          return new NextResponse('Fetch Error', { status: 500 });
        }

      default:
        // Code to handle other cases, if necessary // Code for "desktop" type
        const screenshotUrl = await getScreenshotUrl(linkUrl, type);
        if (desktopScreenshotUrl) {
          const uploadThingUrl = await getUploadThingUrl(screenshotUrl);
          if (uploadThingUrl.data?.url) {
            const newLink = await prismadb.link.create({
              data: {
                userId: user.id,
                imageDesktopFileKey: uploadThingUrl.data.key,
                imageDesktopUrl: uploadThingUrl.data?.url,
                imageMobileFileKey: '',
                imageMobileUrl: '',
                linkUrl: linkUrl,
                projectId: projectId,
              },
            });
            return NextResponse.json(newLink);
          } else {
            return new NextResponse('Fetch Error', { status: 500 });
          }
        } else {
          return new NextResponse('Fetch Error', { status: 500 });
        }
    }

    
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}