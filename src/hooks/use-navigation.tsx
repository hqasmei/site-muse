'use client';

import { useEffect, useState } from 'react';



import { usePathname } from 'next/navigation';





const useNavigation = () => {
  const pathname = usePathname();
  const [isBookmarksActive, setIsBookmarks] = useState(false);
  const [isProjectsActive, setIsProjectsActive] = useState(false);

  useEffect(() => {
    setIsBookmarks(false);
    setIsProjectsActive(false);

    switch (pathname) {
      case '/bookmarks':
        setIsBookmarks(true);
        break;
      case '/projects':
        setIsProjectsActive(true);
        break;
      default:
        // Handle any other cases here
        break;
    }
  }, [pathname]);

  return {
    isBookmarksActive,
    isProjectsActive,
  };
};

export default useNavigation;