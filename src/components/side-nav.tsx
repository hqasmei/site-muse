'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import useNavigation from '@/hooks/use-navigation';
import { useAuth, UserButton, useUser } from '@clerk/nextjs';
import { Icon } from '@iconify/react';

const SideNav = () => {
  const { isBookmarksActive, isProjectsActive, isDiscoverActive } =
    useNavigation();
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <div className="flex-col space-y-4 items-center hidden sm:flex border-r border-zinc-200 h-full  w-[65px] md:w-[220px] md:items-start fixed bg-white">
      <div className="w-full flex-1 pt-6">
        <div className=" ">
          <Link
            href="/bookmarks"
            className="font-bold flex flex-row items-center px-4"
          >
            <Image
              priority
              src="https://res.cloudinary.com/duud9d8dv/image/upload/v1694728994/site-muse_kk5ems.png"
              alt=""
              width="100"
              height="100"
              className="mr-2 w-8 h-8 md:h-6 md:w-6"
            />

            <div className="mr-1 hidden md:flex">
              <span className="text-lg">Site</span>
              <span className="text-blue-700 text-lg">Muse</span>
            </div>
            <span className="text-xs border rounded-full px-2 hidden md:flex">
              beta
            </span>
          </Link>
        </div>

        <div className="flex flex-col  space-y-2 px-3  md:space-y-1 pt-4 items-center md:items-start">
          <Link
            href="/bookmarks"
            className={`flex flex-row space-x-2 justify-center items-center md:justify-start relative px-2 rounded py-2 hover:bg-zinc-100 group  w-full ${
              isBookmarksActive ? 'bg-zinc-100' : ''
            }`}
          >
            {isBookmarksActive ? (
              <Icon
                icon="material-symbols:bookmark-outline"
                width="20"
                height="20"
                className="text-blue-700"
              />
            ) : (
              <Icon
                icon="material-symbols:bookmark-outline"
                width="20"
                height="20"
                className="  group-hover:text-blue-700"
              />
            )}

            <span
              className={`hidden text-sm md:flex font-semibold group-hover:text-blue-700 ${
                isBookmarksActive ? 'text-blue-700' : ''
              }`}
            >
              Bookmarks
            </span>
          </Link>
          <Link
            href="/projects"
            className={`flex flex-row space-x-2 items-center justify-center md:justify-start  relative px-2 rounded py-2 hover:bg-zinc-100 group  w-full ${
              isProjectsActive ? 'bg-zinc-100' : ''
            }`}
          >
            {isProjectsActive ? (
              <Icon
                icon="material-symbols:team-dashboard-outline"
                width="20"
                height="20"
                className="text-blue-700  "
              />
            ) : (
              <Icon
                icon="material-symbols:team-dashboard-outline"
                width="20"
                height="20"
                className="  group-hover:text-blue-700"
              />
            )}

            <span
              className={`hidden md:flex text-sm font-semibold group-hover:text-blue-700 ${
                isProjectsActive ? 'text-blue-700' : ''
              }`}
            >
              Projects
            </span>
          </Link>
          <Link
            href="/discover"
            className={`flex flex-row space-x-2 items-center justify-center md:justify-start  relative px-2 rounded py-2 hover:bg-zinc-100 group  w-full ${
              isDiscoverActive ? 'bg-zinc-100' : ''
            }`}
          >
            {isDiscoverActive ? (
              <Icon
                icon="lucide:sparkles"
                width="20"
                height="20"
                className="text-blue-700  "
              />
            ) : (
              <Icon
                icon="lucide:sparkles"
                width="20"
                height="20"
                className="  group-hover:text-blue-700"
              />
            )}

            <span
              className={`hidden md:flex text-sm font-semibold group-hover:text-blue-700 ${
                isDiscoverActive ? 'text-blue-700' : ''
              }`}
            >
              Discover
            </span>
          </Link>
        </div>
      </div>

      <div className="flex flex-row space-x-2 px-4   py-4">
        {isSignedIn && (
          <div className="hidden items-center space-x-4 sm:flex font-medium text-sm">
            <UserButton afterSignOutUrl="/" />
            <span className="hidden md:flex">{user.fullName}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNav;
