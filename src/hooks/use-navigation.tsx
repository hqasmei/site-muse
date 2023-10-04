'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

const useNavigation = () => {
  const pathname = usePathname();
  const [isAllLinksActive, setIsAllLinks] = useState(false);
  const [isProjectsActive, setIsProjectsActive] = useState(false);

  useEffect(() => {
    setIsAllLinks(false);
    setIsProjectsActive(false);

    switch (pathname) {
      case '/dashboard':
        setIsAllLinks(true);
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
    isAllLinksActive,
    isProjectsActive,
  };
};

export default useNavigation;
