import React from 'react';

import { Projects } from '@/components/projects';
import prismadb from '@/lib/prismadb';
import { currentUser } from '@clerk/nextjs';

const ProjectsPage = async () => {
  const user = await currentUser();

  const data = await prismadb.project.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
  });

  return <Projects data={data} />;
};

export default ProjectsPage;
