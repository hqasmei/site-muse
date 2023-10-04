'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import IconMenu from '@/components/icon-menu';
import Delete from '@/components/icons/delete';
import ThreeDots from '@/components/icons/three-dots';
import { useDeleteProjectModal } from '@/components/modals/delete-project-modal';
import { useUpdateProjectModal } from '@/components/modals/update-project-modal';
import Popover from '@/components/popover';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Edit3 } from 'lucide-react';

export const ProjectCard = ({ item }: any) => {
  const [openPopover, setOpenPopover] = useState(false);
  const [selected, setSelected] = useState(false);

  const { setShowDeleteProjectModal, DeleteProjectModal } =
    useDeleteProjectModal({
      props: { projectId: item.id },
    });

  const { setShowUpdateProjectModal, UpdateProjectModal } =
    useUpdateProjectModal({
      props: {
        projectId: item.id,
        projectName: item.name,
        projectColor: item.color,
      },
    });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['getLink', { id: item.id }],
    queryFn: async () => {
      const { data } = await axios.post('/api/link/get', {
        projectId: item.id,
      });
      return data;
    },
  });

  const onKeyDown = (e: any) => {
    if ((selected || openPopover) && ['e', 'd'].includes(e.key)) {
      setSelected(false);
      e.preventDefault();
      switch (e.key) {
        case 'e':
          setShowUpdateProjectModal(true);
          break;
        case 'd':
          setShowDeleteProjectModal(true);
          break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  if (isLoading)
    return (
      <div>
        <Card
          key={item.id}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg relative"
        >
          <div className="h-12 bg-gray-100 rounded-t-lg"></div>

          <div className="flex flex-row justify-between text-muted-foreground p-4">
            <div>
              <div className="flex flex-col space-y-2">
                <Skeleton className="w-[120px] h-[18px] rounded-full bg-gray-300" />
                <Skeleton className="w-[50px] h-[18px] rounded-full bg-gray-300" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    );

  if (isError) return <div>Error...</div>;

  return (
    <>
      <DeleteProjectModal />
      <UpdateProjectModal />

      <Card
        key={item.id}
        className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg relative"
      >
        <Link
          href={`/projects/${item.id}`}
          className="absolute left-0 top-0 z-0 h-full w-full"
        ></Link>
        <div
          className={`h-12 bg-gradient-to-r ${item.color}  rounded-t-lg`}
        ></div>

        <div className="flex flex-row justify-between text-muted-foreground p-4">
          <div>
            <div className="flex flex-col space-y-2">
              <p className="font-bold">{item.name}</p>
              {data.length > 1 ? (
                <span className="text-sm">{data.length} bookmarks</span>
              ) : (
                <span className="text-sm">{data.length} bookmark</span>
              )}
            </div>
          </div>
          <div className="self-end z-10">
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
                    <IconMenu
                      text="Edit"
                      icon={<Edit3 className="h-4 w-4" />}
                    />
                    <kbd className="hidden rounded bg-gray-100 px-2 py-0.5 text-xs font-light text-gray-500 transition-all duration-75 group-hover:bg-gray-200 sm:inline-block">
                      E
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
                      D
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
      </Card>
    </>
  );
};
