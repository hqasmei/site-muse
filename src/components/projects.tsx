'use client';

import { useState } from 'react';

import { useCreateProjectModal } from '@/components/modals/create-project-modal';
import { ProjectCard } from '@/components/project/project-card';
import { Button } from '@/components/ui/button';
import { Project } from '@prisma/client';

import MaxWidthWrapper from './max-width-wrapper';

type ProjectsProps = {
  data: Project[];
};

export const Projects = ({ data }: ProjectsProps) => {
  const { setShowCreateProjectModal, CreateProjectModal } =
    useCreateProjectModal();

  return (
    <>
      <CreateProjectModal />
      <div className="mt-8 justify-between flex border-b border-gray-200 pb-5  flex-row  items-center  gap-0 px-4">
        <h1 className="mb-3 font-heading text-2xl font-semibold text-gray-900 lg:text-4xl">
          My Projects
        </h1>

        <Button size="sm" onClick={() => setShowCreateProjectModal(true)}>
          Create Project
        </Button>
      </div>
      {data.length === 0 ? (
        <div className="relative flex flex-col items-center gap-4 p-8 h-full flex-1 mt-8 px-4">
          <p className="mt-1 text-sm text-zinc-500">
            Let&#39;s create your first Project.
          </p>
          <div className="mt-8"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8 pb-24 mt-8 px-4">
          {data.map((item) => {
            return <ProjectCard key={item.id} item={item} />;
          })}
        </div>
      )}
    </>
  );
};
