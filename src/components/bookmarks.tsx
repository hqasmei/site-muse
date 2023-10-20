'use client';

import React, { useState } from 'react';

import { LinkCard } from '@/components/link/link-card';
import { useCreateLinkModal } from '@/components/modals/create-link-modal';
import { Button } from '@/components/ui/button';
import { Link } from '@prisma/client';

type BookmarksProps = {
  data: Link[];
};

export const Bookmarks = ({ data }: BookmarksProps) => {
  const { setShowCreateLinkModal, CreateLinkModal } = useCreateLinkModal();

  return (
    <>
      <CreateLinkModal />
      <div className="mt-8 justify-between flex border-b border-gray-200 pb-5  flex-row  items-center  gap-0 px-4 ">
        <h1 className="mb-3 font-heading text-2xl font-semibold text-gray-900 lg:text-4xl">
          My Bookmarks
        </h1>

        <Button size="sm" onClick={() => setShowCreateLinkModal(true)}>
          Add Link
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="relative flex flex-col items-center gap-4 p-8 h-full   mt-8 px-4 bg-zinc-200">
          <p className="mt-1 text-sm text-zinc-500">
            Let&#39;s create your first Bookmark.
          </p>
          <div className="mt-8"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8 pb-24 pt-8 px-4">
          {data.map((item) => {
            return <LinkCard key={item.id} item={item} />;
          })}
        </div>
      )}
    </>
  );
};
