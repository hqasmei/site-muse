'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import IconMenu from '@/components/icon-menu';
import Delete from '@/components/icons/delete';
import Download from '@/components/icons/download';
import ThreeDots from '@/components/icons/three-dots';
import { LinkCard } from '@/components/link/link-card';
import { useCreateLinkModal } from '@/components/modals/create-link-modal';
import { useDeleteProjectModal } from '@/components/modals/delete-project-modal';
import { useUpdateProjectModal } from '@/components/modals/update-project-modal';
import Popover from '@/components/popover';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import download from 'downloadjs';
import JSZip from 'jszip';
import { Edit3 } from 'lucide-react';

import ArrowLeft from '../icons/arrow-left';

type ProjectProps = {
  project: any;
  links: any;
};

export const Project = ({ project, links }: ProjectProps) => {
  const props = {
    projectId: project.id,
    projectName: project.name,
    projectColor: project.color,
  };
  const [openPopover, setOpenPopover] = useState(false);

  const handleDownload = async () => {
    try {
      const projectImages = await axios.post('/api/images', {
        projectId: project.id,
      });
      const imageUrls = projectImages.data.flatMap((item: any) =>
        [item.imageDesktopUrl, item.imageMobileUrl].filter((url) => url !== ''),
      );

      const zip = new JSZip();

      for (let i = 0; i < imageUrls.length; i++) {
        const imageUrl = imageUrls[i];

        // Fetch the image data
        const response = await axios.get(imageUrl, {
          responseType: 'arraybuffer',
        });

        // Get the file name from the URL or use a generic name
        const fileName =
          imageUrl.substring(imageUrl.lastIndexOf('/') + 1) || `image_${i}.jpg`;

        // Add the image to the zip
        zip.file(fileName, response.data, { binary: true });
      }

      // Generate the zip content
      const content = await zip.generateAsync({ type: 'blob' });

      console.log(projectImages.data);
      console.log(imageUrls);
      console.log(content);

      // Trigger the download using downloadjs
      download(content, 'images.zip', 'application/zip');

      setOpenPopover(false);
    } catch (error) {
      console.log(error);
    }
  };
  const { setShowCreateLinkModal, CreateLinkModal } = useCreateLinkModal({
    props: { projectId: props.projectId },
  });

  const { setShowDeleteProjectModal, DeleteProjectModal } =
    useDeleteProjectModal({
      props: { projectId: props.projectId },
    });

  const { setShowUpdateProjectModal, UpdateProjectModal } =
    useUpdateProjectModal({
      props: {
        projectId: props.projectId,
        projectName: props.projectName,
        projectColor: props.projectColor,
      },
    });

  return (
    <div className="flex flex-col  mt-10 space-y-6">
      <CreateLinkModal />
      <UpdateProjectModal />
      <DeleteProjectModal />

      <Link
        href="/projects"
        className="flex flex-row space-x-0.5 items-center group px-4"
      >
        <ArrowLeft className="group-hover:-translate-x-0.5 duration-100" />
        <span>Back</span>
      </Link>

      <div className="mt-8 justify-between flex border-b border-gray-200 pb-5  flex-row  items-center  gap-0 px-4">
        <div className="flex flex-row space-x-2 items-center  ">
          <h1 className="mb-3 font-heading text-2xl font-semibold text-gray-900 lg:text-4xl">
            {project?.name}
          </h1>
        </div>
        <div className="flex flex-row space-x-2 items-center">
          <Button
            size="sm"
            onClick={() => {
              setShowCreateLinkModal(true);
            }}
          >
            Add Link
          </Button>
          <Popover
            content={
              <div className="grid w-full gap-px p-2 sm:w-48">
                <button
                  onClick={() => {
                    setOpenPopover(false);
                    setShowUpdateProjectModal(true);
                  }}
                  className="group flex w-full items-center justify-between rounded-md p-2 text-left text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100"
                >
                  <IconMenu text="Edit" icon={<Edit3 className="h-4 w-4" />} />
                  <kbd className="hidden rounded bg-gray-100 px-2 py-0.5 text-xs font-light text-gray-500 transition-all duration-75 group-hover:bg-gray-200 sm:inline-block">
                    E
                  </kbd>
                </button>

                <button
                  onClick={handleDownload}
                  className="group flex w-full items-center justify-between rounded-md p-2 text-left text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100"
                >
                  <IconMenu
                    text="Download"
                    icon={<Download className="h-4 w-4" />}
                  />
                  <kbd className="hidden rounded bg-gray-100 px-2 py-0.5 text-xs font-light text-gray-500 transition-all duration-75 group-hover:bg-gray-200 sm:inline-block">
                    D
                  </kbd>
                </button>

                <button
                  onClick={() => {
                    setOpenPopover(false);
                    setShowDeleteProjectModal(true);
                  }}
                  className="group flex w-full items-center justify-between rounded-md p-2 text-left text-sm font-medium text-red-600 transition-all duration-75 hover:bg-red-600 hover:text-white"
                >
                  <IconMenu
                    text="Delete"
                    icon={<Delete className="h-4 w-4" />}
                  />
                  <kbd className="hidden rounded bg-red-100 px-2 py-0.5 text-xs font-light text-red-600 transition-all duration-75 group-hover:bg-red-500 group-hover:text-white sm:inline-block">
                    X
                  </kbd>
                </button>
              </div>
            }
            align="end"
            openPopover={openPopover}
            setOpenPopover={setOpenPopover}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenPopover(!openPopover);
              }}
              className="rounded-md px-1 py-2 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
            >
              <span className="sr-only">Edit</span>
              <ThreeDots className="h-7 w-7 text-gray-500" />
            </button>
          </Popover>
        </div>
      </div>

      {links.length === 0 ? (
        <div className="relative flex flex-col items-center gap-4 p-8 h-full flex-1 mt-8">
          <p className="mt-1 text-sm text-zinc-500">
            Let&#39;s create your first Link.
          </p>
          <div className="mt-8"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 px-4  gap-8 pb-10 mt-8">
          {links.map((link: any) => {
            const options = {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            } as const;
            const formattedDate = link.createdAt.toLocaleString(
              'en-US',
              options,
            );

            return (
              <LinkCard key={link.id} projectId={props.projectId} item={link} />
            );
          })}
        </div>
      )}
    </div>
  );
};
