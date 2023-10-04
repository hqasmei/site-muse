import React from 'react';

import { Bookmarks } from '@/components/bookmarks';
import prismadb from '@/lib/prismadb';
import { currentUser } from '@clerk/nextjs';

const DashboardPage = async () => {
  const user = await currentUser();

  const data = await prismadb.link.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
  });

  return <Bookmarks data={data} />;
};

export default DashboardPage;
