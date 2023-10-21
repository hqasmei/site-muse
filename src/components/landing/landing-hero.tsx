'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useAuth } from '@clerk/nextjs';

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <>
      <div className="mx-auto  h-full w-full flex items-center justify-center text-center relative">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:48px_48px]"></div>
        <div className="w-full max-w-screen-xl px-2.5 md:px-20 pb-28 pt-28 flex flex-col items-center justify-center text-center sm:pt-40 ">
          <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl">
            Seamlessly organize your
            <span className="text-blue-600"> research </span>
            and
            <span className="text-blue-600"> inspiration </span>
            <br className="hidden sm:block" />
          </h1>
          <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
            Effortlessly curate, collaborate, and craft with a cutting-edge
            platform that seamlessly organizes your web design research and
            inspiration.
          </p>
          <div className="mt-2 flex items-center gap-6">
            <Link
              href={isSignedIn ? '/bookmarks' : '/sign-up'}
              className="active:scale-95 inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8 mt-5"
            >
              Get started
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
                className="ml-2 h-5 w-5"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>

          <div>
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <Image
                    src="https://res.cloudinary.com/duud9d8dv/image/upload/v1697847276/Screenshot_2023-10-20_at_5.14.05_PM_m5isn8.png"
                    alt="w"
                    width={1364}
                    height={866}
                    quality={100}
                    className="rounded-md bg-white  shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
