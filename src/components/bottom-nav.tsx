'use client';

import React from 'react';

import Link from 'next/link';

import useNavigation from '@/hooks/use-navigation';
import useScrollingEffect from '@/hooks/use-transparent-scroll';
import { UserButton } from '@clerk/nextjs';
import { Icon } from '@iconify/react';

const BottomNav = () => {
  const scrollDirection = useScrollingEffect(); // Use the custom hook
  const navClass =
    scrollDirection === 'up' || window.scrollY === 0
      ? ''
      : 'opacity-25 duration-500';

  const { isBookmarksActive, isProjectsActive } = useNavigation();

  return (
    <div
      className={`fixed bottom-0 w-full  z-10 bg-zinc-100 dark:bg-zinc-950 border-t dark:border-zinc-800 border-zinc-200 shadow-lg sm:hidden ${navClass}`}
    >
      <div className="flex flex-row items-center justify-start bg-transparent w-full">
        <Link
          href="/dashboard"
          className={`flex flex-col space-y-1 justify-center items-center w-full py-2 ${
            isBookmarksActive ? ' bg-zinc-200' : ''
          }`}
        >
          {isBookmarksActive ? (
            <Icon icon="material-symbols:bookmark" width="20" height="20" />
          ) : (
            <Icon
              icon="material-symbols:bookmark-outline"
              width="20"
              height="20"
            />
          )}
          <span className="text-xs">Bookmarks</span>
        </Link>
        <Link
          href="/projects"
          className={`flex flex-col space-y-1 items-center justify-center w-full py-2 ${
            isProjectsActive ? ' bg-zinc-200' : ''
          }`}
        >
          {isProjectsActive ? (
            <Icon
              icon="material-symbols:team-dashboard"
              width="20"
              height="20"
            />
          ) : (
            <Icon icon="material-symbols:team-dashboard-outline" />
          )}
          <span className="text-xs">Projects</span>
        </Link>
        <div className="flex items-center justify-center w-full">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
