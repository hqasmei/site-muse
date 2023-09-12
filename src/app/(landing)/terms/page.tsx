import { Metadata } from 'next';

import LegalPage from '@/components/content/legal';
import { constructMetadata } from '@/lib/utils';
import { allLegalPosts } from 'contentlayer/generated';

export const metadata: Metadata = constructMetadata({
  title: 'Terms of Service – SiteMuse',
});

export default function Terms() {
  const post = allLegalPosts.find((post) => post.slug === 'terms')!;
  return <LegalPage post={post} />;
}
