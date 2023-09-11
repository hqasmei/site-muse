import { clsx, type ClassValue } from 'clsx';
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
