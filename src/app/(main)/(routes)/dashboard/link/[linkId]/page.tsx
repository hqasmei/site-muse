import React from 'react';

import { Bookmark } from '@/components/link/bookmark';
import prismadb from '@/lib/prismadb';

type LinkPageProps = {
  params: {
    linkId: string;
  };
};

const LinkPage = async ({ params }: LinkPageProps) => {
  const link = await prismadb.link.findUnique({
    where: {
      id: params.linkId,
    },
  });

  if (link) {
    return <Bookmark link={link} />;
  }
};

export default LinkPage;
