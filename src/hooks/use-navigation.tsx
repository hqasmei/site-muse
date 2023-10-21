'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

const useNavigation = () => {
  const pathname = usePathname();
  const [isBookmarksActive, setIsBookmarks] = useState(false);
  const [isProjectsActive, setIsProjectsActive] = useState(false);
  const [isDiscoverActive, setIsDiscoverActive] = useState(false);

  useEffect(() => {
    setIsBookmarks(false);
    setIsProjectsActive(false);
    setIsDiscoverActive(false);

    switch (pathname) {
      case '/bookmarks':
        setIsBookmarks(true);
        break;
      case '/projects':
        setIsProjectsActive(true);
        break;
      case '/discover':
        setIsDiscoverActive(true);
        break;
      default:
        // Handle any other cases here
        break;
    }
  }, [pathname]);

  return {
    isBookmarksActive,
    isProjectsActive,
    isDiscoverActive,
  };
};

export default useNavigation;
