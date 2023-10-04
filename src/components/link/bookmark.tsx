'use client';

import Image from 'next/image';
import Link from 'next/link';

import Download from '@/components/icons/download';
import download from 'downloadjs';

import ArrowLeft from '../icons/arrow-left';

type BookmarkProps = {
  link: any;
  projectId?: string;
};

export const Bookmark = ({ link, projectId }: BookmarkProps) => {
  const handleDownload = (imageURL: string) => {
    download(imageURL);
  };

  return (
    <div className="flex flex-col px-4 mt-10 space-y-6">
      <Link
        href={`${projectId ? `/dashboard/${projectId}` : `/dashboard`}`}
        className="flex flex-row space-x-0.5 items-center group"
      >
        <ArrowLeft className="group-hover:-translate-x-0.5 duration-100" />
        <span>Back</span>
      </Link>

      <div className="relative">
        {link.imageDesktopUrl != '' && link.imageMobileUrl != '' ? (
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-2">
            <div className="flex flex-col space-y-2 relative">
              <p>Desktop Version</p>
              <Image
                src={link.imageDesktopUrl}
                alt=""
                width={1400}
                height={500}
                quality={100}
                className="rounded-t-lg border h-full"
              />

              <button
                onClick={() => handleDownload(link.imageDesktopUrl)}
                className="absolute top-8 right-4 bg-zinc-300 hover:bg-zinc-400 duration-150 z-10 h-8 w-8 rounded p-1"
              >
                <Download />
              </button>
            </div>

            <div className="flex flex-col space-y-2 relative">
              <p>Mobile Version</p>
              <Image
                src={link.imageMobileUrl}
                alt=""
                width={390}
                height={500}
                quality={100}
                className="rounded-t-lg border h-full"
              />
              <button
                onClick={() => handleDownload(link.imageMobileUrl)}
                className="absolute top-8 right-4 bg-zinc-300 hover:bg-zinc-400 duration-150 z-10 h-8 w-8 rounded p-1"
              >
                <Download />
              </button>
            </div>
          </div>
        ) : link.imageDesktopUrl != '' && link.imageMobileUrl == '' ? (
          <Image
            src={link.imageDesktopUrl}
            alt=""
            width={1400}
            height={400}
            quality={100}
            className="rounded-t-lg border h-full"
          />
        ) : (
          <Image
            src={link.imageMobileUrl}
            alt=""
            width={390}
            height={500}
            quality={100}
            className="rounded-t-lg border h-full"
          />
        )}
      </div>
    </div>
  );
};
