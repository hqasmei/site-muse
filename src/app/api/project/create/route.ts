import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth, currentUser } from '@clerk/nextjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { name, color } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Create the new project with a default position
    const newProject = await prismadb.project.create({
      data: {
        userId: user.id,
        userName: user.firstName,
        name,
        color,
        position: 0, // You can set a default position here
      },
    });

    // Fetch all projects for the user and update their positions
    const userProjects = await prismadb.project.findMany({
      where: {
        userId: user.id,
      },
    });

    // Reorder the positions of existing projects
    const updatedProjects = userProjects.map((project, index) => ({
      ...project,
      position: index + 1, // Update the position based on the order
    }));

    await Promise.all(
      updatedProjects.map((project) =>
        prismadb.project.update({
          where: { id: project.id },
          data: { position: project.position },
        }),
      ),
    );

    return NextResponse.json(newProject);
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
