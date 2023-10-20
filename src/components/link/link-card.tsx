'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

export const LinkCard = ({
  item,
  projectId,
}: {
  item: any;
  projectId?: any;
}) => {
  return (
    <>
      <Card className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition relative flex flex-col">
        <Link href={`/bookmarks/link/${item.id}`} className="group">
          <div className="h-68 items-center justify-center flex relative overflow-hidden bg-cover bg-no-repeat rounded-t-lg">
            {item.imageDesktopUrl != '' ? (
              <Image
                src={item.imageDesktopUrl}
                alt=""
                width={400}
                height={300}
                className="rounded-t-lg h-[300px] object-top object-cover  transition duration-300 ease-in-out group-hover:scale-105"
              />
            ) : (
              <Image
                src={item.imageMobileUrl}
                alt=""
                width={400}
                height={300}
                className="rounded-t-lg h-[300px] object-top object-cover transition duration-300 ease-in-out group-hover:scale-105"
              />
            )}
          </div>
        </Link>

        <div className="flex flex-row text-muted-foreground py-2 px-4 justify-start">
          <Link
            href={item.linkUrl}
            target="_blank"
            className="hover:decoration-zinc-400 hover:underline hover:underline-offset-2 text-ellipsis overflow-hidden whitespace-nowrap"
          >
            {item.linkUrl}
          </Link>
        </div>
      </Card>
    </>
  );
};
