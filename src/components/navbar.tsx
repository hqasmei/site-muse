"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import useScroll from "@/hooks/use-scroll";
import { useParams, useSelectedLayoutSegment } from "next/navigation";
import MaxWidthWrapper from "./max-width-wrapper";
import { NAV_ITEMS, SHOW_BACKGROUND_SEGMENTS } from "@/lib/constants";
import { useAuth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import siteMuseLogo from "../../public/sitemuse.svg";

const Navbar = () => {
  const scrolled = useScroll(80);
  const selectedLayout = useSelectedLayoutSegment();
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  return (
    <div
      className={cn(`sticky inset-x-0 top-0 z-30 w-full transition-all`, {
        "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
        "border-b border-gray-200 bg-white":
          selectedLayout && !SHOW_BACKGROUND_SEGMENTS.has(selectedLayout),
      })}
    >
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="font-bold flex flex-row items-center">
              <Image
                priority
                src={siteMuseLogo}
                alt=""
                width={28}
                height={28}
                className="mr-2"
              />

              <div className="mr-1">
                <span className="text-lg">Site</span>
                <span className="text-blue-700 text-lg">Muse</span>
              </div>
              <span className="text-xs border rounded-full px-2">beta</span>
            </Link>
          </div>

          <div className="hidden lg:block">
            {sessionId ? (
              <div className="flex flex-row space-x-2">
                <div className="hidden items-center space-x-4 sm:flex font-medium text-sm">
                  <Link href="/dashboard">Dashboard</Link>
                  <Link href="/discover">Discover</Link>
                  <Link href="/contact">Contact</Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="animate-fade-in rounded-full px-4 py-1.5 text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black"
                >
                  Log in
                </Link>
                <Link
                  href="/sign-up"
                  className="animate-fade-in rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
