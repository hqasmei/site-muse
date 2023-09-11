import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export default function MaxWidthWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-screen-xl px-2.5 lg:px-20',
        className,
      )}
    >
      {children}
    </div>
  );
}
