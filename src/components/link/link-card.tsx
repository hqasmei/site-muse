"use client";
import Link from "next/link";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import { useDeleteLinkModal } from "../modals/delete-link-modal";
import Delete from "../icons/delete";

export const LinkCard = ({ item }: any) => {
  const { setDeleteLinkId, setShowDeleteLinkModal, DeleteLinkModal } =
    useDeleteLinkModal();

  return (
    <>
      <DeleteLinkModal />
      <Card className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition relative flex flex-col">
        <div className="h-68 relative">
          <Image
            src={item.imageUrl}
            alt=""
            width={400}
            height={300}
            className="rounded-t-lg"
            style={{ objectPosition: "center top" }}
          />
        </div>

        <div className="flex flex-row justify-between text-muted-foreground p-4 ">
          <div className="flex flex-col space-y-2">
            <Link href={`${item.linkUrl}`} className="hover:underline">
              <p>{item.linkUrl}</p>
            </Link>
          </div>
          <button
            onClick={() => {
              setDeleteLinkId(item.id);
              setShowDeleteLinkModal(true);
            }}
          >
            <Delete className="text-red-500 hover:text-red-600" />
          </button>
        </div>
      </Card>
    </>
  );
};
