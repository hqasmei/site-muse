'use client';

import { useParams } from 'next/navigation';

import MaxWidthWrapper from '../max-width-wrapper';

export default function BlogLayoutHero() {
  const { slug } = useParams() as { slug?: string };

  return (
    <MaxWidthWrapper>
      <div className="max-w-screen-sm pt-16 pb-8">
        <h1 className="font-display text-3xl font-extrabold text-gray-700 sm:text-4xl">
          Blog
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          Latest news and updates from SiteMuse.
        </p>
      </div>
    </MaxWidthWrapper>
  );
}
