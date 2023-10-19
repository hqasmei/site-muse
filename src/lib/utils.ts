import { Metadata } from 'next';

import { clsx, type ClassValue } from 'clsx';
import ms from 'ms';
import { twMerge } from 'tailwind-merge';

interface SWRError extends Error {
  status: number;
}

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const error = await res.text();
    const err = new Error(error) as SWRError;
    err.status = res.status;
    throw err;
  }

  return res.json();
}

export const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
} as const;

export const dateFormatter = (item: any) => {
  return item.createdAt.toLocaleString('en-US', options);
};

export function capitalize(str: string) {
  if (!str || typeof str !== 'string') return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatDate = (dateString: string) => {
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
};

export const timeAgo = (timestamp?: Date): string => {
  if (!timestamp) return 'Just now';
  const diff = Date.now() - new Date(timestamp).getTime();
  if (diff < 60000) {
    // less than 1 second
    return 'Just now';
  } else if (diff > 82800000) {
    // more than 23 hours – similar to how Twitter displays timestamps
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year:
        new Date(timestamp).getFullYear() !== new Date().getFullYear()
          ? 'numeric'
          : undefined,
    });
  }
  return ms(diff);
};

export function constructMetadata({
  title = 'SiteMuse - Bookmark Management for Designers & Developers',
  description = 'SiteMuse is an open-source bookmark management tool for developers and designers to manage bookmarks and streamline research and inspiration.',
  image = 'https://res.cloudinary.com/duud9d8dv/image/upload/v1694494667/site-muse-home-page_un8wsv.png',
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@dubdotco',
    },
    icons,
    metadataBase: new URL('https://sitemuse.co'),
    themeColor: '#FFF',
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
