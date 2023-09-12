import Link from 'next/link';

import { formatDate } from '@/lib/utils';
import { BlogPost } from 'contentlayer/generated';

import BlurImage from './blur-image';
import Author from './content/author';

export default function BlogCard({
  data,
  priority,
}: {
  data: BlogPost;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/blog/${data.slug}`}
      className="flex flex-col rounded-lg border border-gray-200"
    >
      <div className="flex flex-1 flex-col justify-between rounded-b-lg bg-white p-6">
        <div>
          <h2 className="line-clamp-1 font-display text-2xl font-bold text-gray-700">
            {data.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-gray-500">{data.summary}</p>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <Author username={data.author} imageOnly />
          <time dateTime={data.publishedAt} className="text-sm text-gray-500">
            {formatDate(data.publishedAt)}
          </time>
        </div>
      </div>
    </Link>
  );
}
