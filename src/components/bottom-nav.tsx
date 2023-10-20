'use client';

import React from 'react';

import Link from 'next/link';

import useNavigation from '@/hooks/use-navigation';
import { UserButton } from '@clerk/nextjs';
import { Icon } from '@iconify/react';

const BottomNav = () => {
  const { isBookmarksActive, isProjectsActive } = useNavigation();

  return (
    <div
      className={`fixed bottom-0 w-full  z-10 bg-white dark:bg-zinc-950 border-t dark:border-zinc-800 border-zinc-200   sm:hidden `}
    >
      <div className="flex flex-row   bg-transparent w-full">
        <Link
          href="/bookmarks"
          className={`flex flex-col space-y-1 justify-center items-center  w-full  py-2 ${
            isBookmarksActive ? ' bg-zinc-100' : ''
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
            />
          )}
          <span
            className={`text-xs font-semibold ${
              isBookmarksActive ? ' text-blue-700' : ''
            }`}
          >
            Bookmarks
          </span>
        </Link>
        <Link
          href="/projects"
          className={`flex flex-col space-y-1 items-center justify-center  w-full  py-2 ${
            isProjectsActive ? ' bg-zinc-100' : ''
          }`}
        >
          {isProjectsActive ? (
            <Icon
              icon="material-symbols:team-dashboard-outline"
              width="20"
              height="20"
              className="text-blue-700"
            />
          ) : (
            <Icon
              icon="material-symbols:team-dashboard-outline"
              width="20"
              height="20"
            />
          )}
          <span
            className={`text-xs font-semibold ${
              isProjectsActive ? ' text-blue-700' : ''
            }`}
          >
            Projects
          </span>
        </Link>
        <div className="flex items-center justify-center w-full">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
