import { NextResponse } from 'next/server';

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

    const linkImages = await prismadb.link.findMany({
      where: {
        id: linkId,
      },
      select: {
        imageDesktopUrl: true,
        imageMobileUrl: true,
      },
    });

    return NextResponse.json(linkImages);
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
