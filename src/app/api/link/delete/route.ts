import { NextResponse } from 'next/server';

import { deleteUploadThingUrl } from '@/actions/delete-image-url';
import prismadb from '@/lib/prismadb';
import { currentUser } from '@clerk/nextjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { linkId } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!linkId) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const link = await prismadb.link.findUnique({
      where: {
        id: linkId,
      },
    });

    if (link) {
      const deleteUploadThingImage = await deleteUploadThingUrl(
        link?.imageFileKey,
      );

      const deleteLink = await prismadb.link.delete({
        where: {
          id: linkId,
        },
      });

      return NextResponse.json(deleteLink);
    }
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
