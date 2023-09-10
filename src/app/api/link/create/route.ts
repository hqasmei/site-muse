import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

import { currentUser } from "@clerk/nextjs";

import { getScreenshotUrl } from "@/actions/get-image-url";
import { getUploadThingUrl } from "@/actions/get-image-url";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { linkUrl, projectId } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!linkUrl) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Capture screenshot using Screenly
    const screenshotUrl = await getScreenshotUrl(linkUrl); // Implement this function

    if (screenshotUrl) {
      // Upload the screenshot to UploadThing

      const uploadThingUrl = await getUploadThingUrl(screenshotUrl); // Implement this function

      if (uploadThingUrl.data?.url) {
        const newLink = await prismadb.link.create({
          data: {
            userId: user.id,
            imageFileKey: uploadThingUrl.data.key,
            imageUrl: uploadThingUrl.data?.url,
            linkUrl: linkUrl,
            projectId: projectId,
          },
        });
        return NextResponse.json(newLink);
      }
    } else {
      return new NextResponse("Fetch Error", { status: 500 });
    }
  } catch (error) {
    console.log("[PROJECT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
