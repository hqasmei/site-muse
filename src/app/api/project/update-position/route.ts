import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth, currentUser } from '@clerk/nextjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { newPositionOrder } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    if (!Array.isArray(newPositionOrder)) {
      return new NextResponse('Invalid newPositionOrder format', {
        status: 400,
      });
    }

    // Update project positions in the database
    await Promise.all(
      newPositionOrder.map(async (item) => {
        const { projectId, position } = item;
        await prismadb.project.update({
          where: { id: projectId },
          data: { position },
        });
      }),
    );

    return NextResponse.json({
      message: 'Project positions updated successfully',
    });
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
