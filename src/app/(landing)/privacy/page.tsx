import { Metadata } from 'next';

import LegalPage from '@/components/content/legal';
import { constructMetadata } from '@/lib/utils';
import { allLegalPosts } from 'contentlayer/generated';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy – SiteMuse',
});

export default function Privacy() {
  const post = allLegalPosts.find((post) => post.slug === 'privacy')!;
  return <LegalPage post={post} />;
}
