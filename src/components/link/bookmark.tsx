'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import IconMenu from '@/components/icon-menu';
import Delete from '@/components/icons/delete';
import Download from '@/components/icons/download';
import ThreeDots from '@/components/icons/three-dots';
import Popover from '@/components/popover';
import { useTabs } from '@/hooks/use-tabs';
import { Framer } from '@/lib/framer';
import axios from 'axios';
import download from 'downloadjs';
import JSZip from 'jszip';

import ArrowLeft from '../icons/arrow-left';
import { useDeleteLinkModal } from '../modals/delete-link-modal';

type BookmarkProps = {
  link: any;
  projectId?: string;
};

export const Bookmark = ({ link, projectId }: BookmarkProps) => {
  const router = useRouter();
  const [openPopover, setOpenPopover] = useState(false);
  const { setShowDeleteLinkModal, DeleteLinkModal } = useDeleteLinkModal({
    props: { linkId: link.id },
  });

  const handleDownload = (imageURL: string) => {
    download(imageURL);
  };
  const handleDownloadAll = async () => {
    try {
      const linkImages = await axios.post('/api/images/linkId', {
        linkId: link.id,
      });

      const imageUrls = linkImages.data.flatMap((item: any) =>
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

      // Trigger the download using downloadjs
      download(content, 'images.zip', 'application/zip');

      setOpenPopover(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [hookProps] = useState({
    tabs: [
      {
        label: 'Desktop',
        children: (
          <div className="max-w-5xl px-4">
            <div className="flex flex-col space-y-2 relative">
              <Image
                src={link.imageDesktopUrl}
                alt=""
                width={1400}
                height={500}
                quality={100}
                className="rounded-lg border h-full"
              />

              <button
                onClick={() => handleDownload(link.imageDesktopUrl)}
                className="absolute top-8 right-4 bg-zinc-300 hover:bg-zinc-400 duration-150 z-10 h-8 w-8 rounded p-1"
              >
                <Download />
              </button>
            </div>
          </div>
        ),
        id: 'Desktop',
      },
      {
        label: 'Mobile',
        children: (
          <div className="max-w-lg px-4">
            <div className="flex flex-col space-y-2 relative">
              <Image
                src={link.imageMobileUrl}
                alt=""
                width={390}
                height={500}
                quality={100}
                className="rounded-lg border h-full"
              />
              <button
                onClick={() => handleDownload(link.imageMobileUrl)}
                className="absolute top-8 right-4 bg-zinc-300 hover:bg-zinc-400 duration-150 z-10 h-8 w-8 rounded p-1"
              >
                <Download />
              </button>
            </div>
          </div>
        ),
        id: 'Mobile',
      },
    ],
    initialTabId: 'Desktop',
  });
  const framer = useTabs(hookProps);

  return (
    <>
      <DeleteLinkModal />
      <div className="flex flex-col  mt-10 space-y-6 pb-8">
        <button
          onClick={() => router.back()}
          className="flex flex-row space-x-0.5 items-center group px-4"
        >
          <ArrowLeft className="group-hover:-translate-x-0.5 duration-100" />
          <span>Back</span>
        </button>

        <div className="mt-8   flex border-b border-gray-200    flex-col    gap-0 ">
          <div className="flex flex-row justify-between items-end   w-full px-8 pb-6">
            <Link
              href={link.linkUrl}
              target="_blank"
              className="font-heading text-2xl font-semibold text-gray-900 lg:text-4xl underline underline-offset-4 hover:decoration-blue-700 hover:text-blue-700 duration-200"
            >
              {link.linkUrl}
            </Link>

            <Popover
              content={
                <div className="grid w-full gap-px p-2 sm:w-48">
                  <button
                    onClick={handleDownloadAll}
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
                      setShowDeleteLinkModal(true);
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
          <div className="w-full items-start flex px-4">
            <Framer.Tabs {...framer.tabProps} />
          </div>
        </div>

        <div className="w-full flex flex-col  items-center">
          {framer.selectedTab.children}
        </div>
      </div>
    </>
  );
};
