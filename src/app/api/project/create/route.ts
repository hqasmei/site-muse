import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth, currentUser } from '@clerk/nextjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { name } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const project = await prismadb.project.create({
      data: {
        userId: user.id,
        userName: user.firstName,
        name,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
