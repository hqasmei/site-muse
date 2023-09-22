'use client';

import Image from 'next/image';
import Link from 'next/link';

import Download from '@/components/icons/download';
import download from 'downloadjs';

type BookmarkProps = {
  link: any;
  projectId: string;
};

export const Bookmark = ({ link, projectId }: BookmarkProps) => {
  const handleDownload = (imageURL: string) => {
    download(imageURL);
  };

  return (
    <>
      <div>
        <Link
          href={`/dashboard/${projectId}`}
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

      <div className="pt-20 relative">
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
    </>
  );
};
