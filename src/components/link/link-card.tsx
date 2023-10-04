'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Card } from '@/components/ui/card';

import Delete from '../icons/delete';
import { useDeleteLinkModal } from '../modals/delete-link-modal';

export const LinkCard = ({
  item,
  projectId,
}: {
  item: any;
  projectId?: any;
}) => {
  const { setShowDeleteLinkModal, DeleteLinkModal } = useDeleteLinkModal({
    props: { linkId: item.id },
  });

  return (
    <>
      <DeleteLinkModal />
      <Card className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition relative flex flex-col">
        <div className="h-68 relative items-center justify-center flex">
          {item.imageDesktopUrl != '' ? (
            <Image
              src={item.imageDesktopUrl}
              alt=""
              width={400}
              height={300}
              className="rounded-t-lg   h-[300px]"
              style={{ objectPosition: 'center top', objectFit: 'cover' }}
            />
          ) : (
            <Image
              src={item.imageMobileUrl}
              alt=""
              width={400}
              height={300}
              className="rounded-t-lg  h-[300px]"
              style={{ objectPosition: 'center top', objectFit: 'cover' }}
            />
          )}
        </div>

        <div className="flex flex-row text-muted-foreground p-4 justify-evenly">
          <button
            onClick={() => {
              setShowDeleteLinkModal(true);
            }}
          >
            <Delete className="text-red-500 hover:text-red-600" />
          </button>
          <Link href={`${item.linkUrl}`} target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 hover:underline text-gray-400 hover:text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
          </Link>
          {projectId ? (
            <Link href={`/projects/${projectId}/${item.id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6  text-gray-400 hover:text-gray-600 hover:translate-x-1 duration-75"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          ) : (
            <Link href={`/dashboard/link/${item.id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6  text-gray-400 hover:text-gray-600 hover:translate-x-1 duration-75"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          )}
        </div>
      </Card>
    </>
  );
};
