import '@/styles/globals.css';

import type { Metadata } from 'next';

import TanstackProvider from '@/components/providers/tanstack-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'SiteMuse',
  description: '',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body>
          <TanstackProvider>
            {children}
            <Analytics />
          </TanstackProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
