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

    if (!projectId) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const deletedProject = await prismadb.project.delete({
      where: {
        id: projectId,
      },
    });

    return NextResponse.json(deletedProject);
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
