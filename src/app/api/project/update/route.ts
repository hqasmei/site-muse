import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth, currentUser } from '@clerk/nextjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { projectId, projectName, projectColor } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!projectId) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const updateProject = await prismadb.project.update({
      where: { id: projectId },
      data: { name: projectName, color: projectColor },
    });

    return NextResponse.json(updateProject);
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
