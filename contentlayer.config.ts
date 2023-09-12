import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import GithubSlugger from 'github-slugger';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { capitalize } from './src/lib/utils';

export const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: `**/blog/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    seoTitle: {
      type: 'string',
    },
    publishedAt: {
      type: 'string',
      required: true,
    },
    summary: {
      type: 'string',
      required: true,
    },
    seoDescription: {
      type: 'string',
    },
    image: {
      type: 'string',
      required: true,
    },
    author: {
      type: 'string',
      required: true,
    },
    categories: {
      type: 'list',
      of: {
        type: 'enum',
        options: ['company', 'education', 'customer-stories'],
        default: 'company',
      },
      required: true,
    },
    related: {
      type: 'list',
      of: {
        type: 'string',
      },
    },
  },
  // @ts-ignore
  computedFields: computedFields('blog'),
}));

export const ChangelogPost = defineDocumentType(() => ({
  name: 'ChangelogPost',
  filePathPattern: `**/changelog/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    publishedAt: {
      type: 'string',
      required: true,
    },
    summary: {
      type: 'string',
      required: true,
    },
    image: {
      type: 'string',
      required: true,
    },
    author: {
      type: 'string',
      required: true,
    },
  },
  // @ts-ignore
  computedFields: computedFields('changelog'),
}));

export const LegalPost = defineDocumentType(() => ({
  name: 'LegalPost',
  filePathPattern: `**/legal/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    updatedAt: {
      type: 'string',
      required: true,
    },
  },
  // @ts-ignore
  computedFields: computedFields('legal'),
}));

const computedFields = (type: 'blog' | 'changelog' | 'legal') => ({
  slug: {
    type: 'string',
    resolve: (doc: any) => doc._raw.flattenedPath.replace(`${type}/`, ''),
  },
  tableOfContents: {
    type: 'array',
    resolve: (doc: any) => {
      // get all markdown heading 2 nodes (##)
      const headings = doc.body.raw.match(/^##\s.+/gm);
      const slugger = new GithubSlugger();
      return (
        headings?.map((heading: any) => {
          const title = heading.replace(/^##\s/, '');
          return {
            title,
            slug: slugger.slug(title),
          };
        }) || []
      );
    },
  },
  images: {
    type: 'array',
    resolve: (doc: any) => {
      return (
        doc.body.raw.match(/(?<=<Image[^>]*\bsrc=")[^"]+(?="[^>]*\/>)/g) || []
      );
    },
  },

  structuredData: {
    type: 'object',
    resolve: (doc: any) => ({
      '@context': 'https://schema.org',
      '@type': `${capitalize(type)}Posting`,
      headline: doc.title,
      datePublished: doc.publishedAt,
      dateModified: doc.publishedAt,
      description: doc.summary,
      image: doc.image,
      author: {
        '@type': 'Person',
        name: doc.author,
      },
    }),
  },
});

export default makeSource({
  contentDirPath: './src/content',
  documentTypes: [BlogPost, ChangelogPost, LegalPost],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'one-dark-pro',
          onVisitLine(node: any) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className.push('line--highlighted');
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ['word--highlighted'];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
            'data-mdx-heading': '',
          },
        },
      ],
    ],
  },
});
