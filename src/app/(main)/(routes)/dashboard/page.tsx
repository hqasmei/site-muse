import React from 'react';

import { AllLinks } from '@/components/all-links';
import prismadb from '@/lib/prismadb';
import { currentUser } from '@clerk/nextjs';

const DashboardPage = async () => {
  const user = await currentUser();

  const data = await prismadb.link.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
  });

  return <AllLinks data={data} />;
};

export default DashboardPage;
