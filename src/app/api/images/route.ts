import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth, currentUser } from '@clerk/nextjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { projectId } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const projectImages = await prismadb.link.findMany({
      where: {
        projectId: projectId,
      },
      select: {
        imageDesktopUrl: true,
        imageMobileUrl: true,
      },
    });

    return NextResponse.json(projectImages);
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
