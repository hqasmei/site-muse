"use client";
import { useState } from "react";

import { Project } from "@prisma/client";

import { ProjectCard } from "@/components/project/project-card";

import { useCreateProjectModal } from "@/components/modals/create-project-modal";

type DashboardProps = {
  data: Project[];
};

export const Dashboard = ({ data }: DashboardProps) => {
  const { setShowCreateProjectModal, CreateProjectModal } =
    useCreateProjectModal();

  return (
    <>
      <CreateProjectModal />
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-heading text-5xl font-semibold text-gray-900 lg:text-6xl">
          My Projects
        </h1>
        <button
          className="active:scale-95 inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 py-2 px-4"
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="radix-:rd:"
          data-state="closed"
          onClick={() => setShowCreateProjectModal(true)}
        >
          Create Project
        </button>
      </div>
      {data.length === 0 ? (
        <div className="relative flex flex-col items-center gap-4 p-8 h-full flex-1 mt-8">
          <p className="mt-1 text-sm text-zinc-500">
            Let&#39;s create your first Project.
          </p>
          <div className="mt-8"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3   gap-2 pb-10 mt-8">
          {data.map((item) => {
            return <ProjectCard key={item.id} item={item} />;
          })}
        </div>
      )}
    </>
  );
};
