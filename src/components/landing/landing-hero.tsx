"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div
      style={{
        background:
          "linear-gradient(rgba(0, 0, 0, 0), 50%, rgba(129, 172, 246, 0.185))",
      }}
      className="mx-auto  h-full w-full flex items-center justify-center text-center"
    >
      <div className="w-full max-w-screen-xl px-2.5 md:px-20 pb-28 pt-28 flex flex-col items-center justify-center text-center sm:pt-40">
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
            href={isSignedIn ? "/dashboard" : "/sign-up"}
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
          {/* <a
            target="_blank"
            className="active:scale-95 inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 text-primary underline-offset-4 hover:underline h-11 px-8 mt-5"
            href="/pricing"
          >
            See our pricing
          </a> */}
        </div>
      </div>
    </div>
  );
};
