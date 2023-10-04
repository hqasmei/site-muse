import React from 'react';

import { Project } from '@/components/project/project';
import prismadb from '@/lib/prismadb';

type ProjectPageProps = {
  params: {
    projectId: string;
  };
};

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const project = await prismadb.project.findUnique({
    where: {
      id: params.projectId,
    },
  });

  const links = await prismadb.link.findMany({
    where: {
      projectId: params.projectId,
    },
  });

  return <Project project={project} links={links} />;
};

export default ProjectPage;
