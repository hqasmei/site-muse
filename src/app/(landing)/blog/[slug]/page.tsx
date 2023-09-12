import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Author from '@/components/content/author';
import { MDX } from '@/components/content/mdx';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { constructMetadata, formatDate } from '@/lib/utils';
import { allBlogPosts } from 'contentlayer/generated';

export async function generateStaticParams() {
  return allBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const post = allBlogPosts.find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const { title, seoTitle, summary, seoDescription, image } = post;

  return constructMetadata({
    title: `${seoTitle || title} SiteMuse`,
    description: seoDescription || summary,
    image,
  });
}

export default async function BlogArticle({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const data = allBlogPosts.find((post) => post.slug === params.slug);
  if (!data) {
    notFound();
  }

  return (
    <>
      <MaxWidthWrapper>
        <div className="flex max-w-screen-sm flex-col space-y-4 pt-16">
          <div>
            <Link
              href="/blog"
              className="flex flex-row space-x-1 items-center group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1.5 h-4 w-4 group-hover:text-slate-500"
              >
                <path d="m15 18-6-6 6-6"></path>
              </svg>
              <p className="group-hover:text-slate-500">Back</p>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <time
              dateTime={data.publishedAt}
              className="text-sm text-gray-500 transition-colors hover:text-gray-800"
            >
              {formatDate(data.publishedAt)}
            </time>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-gray-700 sm:text-4xl">
            {data.title}
          </h1>
          <p className="text-xl text-gray-500">{data.summary}</p>
        </div>
      </MaxWidthWrapper>

      <div className="relative">
        <div className="absolute top-52 h-full w-full border border-gray-200 bg-white/50 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur-lg" />
        <MaxWidthWrapper className="grid grid-cols-4 gap-10 px-0 py-10">
          <div className="relative col-span-4 mb-10 flex flex-col space-y-8 bg-white sm:rounded-xl sm:border sm:border-gray-200 md:col-span-3">
            <MDX code={data.body.code} className="px-5 pb-20 pt-4 sm:px-10" />
          </div>
          <div className="sticky top-20 col-span-1 mt-48 hidden flex-col divide-y divide-gray-200 self-start sm:flex">
            <div className="flex flex-col space-y-4 py-5">
              <p className="text-sm text-gray-500">Written by</p>
              <Author username={data.author} />
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}
