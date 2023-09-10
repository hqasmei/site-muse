"use client";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader } from "@/components/ui/card";

import { useCreateLinkModal } from "@/components/modals/create-link-modal";
import { LinkCard } from "@/components/link/link-card";

type ProjectProps = {
  project: any;
  links: any;
};

export const Project = ({ project, links }: ProjectProps) => {
  const props = { projectId: project.id };

  const { setAddProjectId, setShowCreateLinkModal, CreateLinkModal } =
    useCreateLinkModal();

  return (
    <>
      <CreateLinkModal />
      <div>
        <Link
          href="/dashboard"
          className="flex flex-row space-x-1 items-center group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1.5 h-4 w-4 group-hover:text-slate-500"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
          <p className="group-hover:text-slate-500">Back</p>
        </Link>
      </div>
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <div className="flex flex-row space-x-2 items-center">
          <h1 className="mb-3 font-heading text-5xl font-semibold text-gray-900 lg:text-6xl">
            {project?.name}
          </h1>
        </div>

        <button
          className="active:scale-95 inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 py-2 px-4"
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="radix-:rd:"
          data-state="closed"
          onClick={() => {
            setAddProjectId(props.projectId);
            setShowCreateLinkModal(true);
          }}
        >
          Add Link
        </button>
      </div>

      {links.length === 0 ? (
        <div className="relative flex flex-col items-center gap-4 p-8 h-full flex-1 mt-8">
          <p className="mt-1 text-sm text-zinc-500">
            Let&#39;s create your first Link.
          </p>
          <div className="mt-8"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3   gap-2 pb-10 mt-8">
          {links.map((link: any) => {
            const options = {
              year: "numeric",
              month: "short",
              day: "numeric",
            } as const;
            const formattedDate = link.createdAt.toLocaleString(
              "en-US",
              options
            );

            return <LinkCard key={link.id} item={link} />;
          })}
        </div>
      )}
    </>
  );
};
