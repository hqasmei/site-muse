"use client";
import { useEffect, useState } from "react";

import Link from "next/link";

import { Edit3 } from "lucide-react";
import Popover from "@/components/popover";
import { Card } from "@/components/ui/card";
import ThreeDots from "@/components/icons/three-dots";
import Delete from "@/components/icons/delete";
import IconMenu from "@/components/icon-menu";
import { useUpdateProjectModal } from "@/components/modals/update-project-modal";
import { useDeleteProjectModal } from "@/components/modals/delete-project-modal";

export const ProjectCard = ({ item }: any) => {
  const { setDeleteProjectId, setShowDeleteProjectModal, DeleteProjectModal } =
    useDeleteProjectModal();

  const {
    setUpdateProjectId,
    setUpdateProjectName,
    setShowUpdateProjectModal,
    UpdateProjectModal,
  } = useUpdateProjectModal();

  const [openPopover, setOpenPopover] = useState(false);

  // Options for formatting the date
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  } as const;
  const formattedDate = item.createdAt.toLocaleString("en-US", options);

  return (
    <>
      <DeleteProjectModal />
      <UpdateProjectModal />

      <Card
        key={item.id}
        className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg relative"
      >
        <Link
          href={`/dashboard/${item.id}`}
          className="absolute left-0 top-0 z-0 h-full w-full"
        ></Link>
        <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-lg"></div>

        <div className="flex flex-row justify-between text-muted-foreground p-4">
          <div>
            <div className="flex flex-col space-y-2">
              <p className="font-bold">{item.name}</p>
              <span className="text-sm">1 bookmark</span>
            </div>
          </div>
          <div className="self-end z-10">
            <Popover
              content={
                <div className="grid w-full gap-px p-2 sm:w-48">
                  <button
                    onClick={() => {
                      setOpenPopover(false);
                      setUpdateProjectId(item.id);
                      setUpdateProjectName(item.name);
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
                      setDeleteProjectId(item.id);
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
      </Card>
    </>
  );
};
