import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { getPost, getPostMetadata, getPostSlugs } from '~/lib/posts';

import { markdownComponents } from './markdown-components';

import type { Metadata } from 'next';

export const generateStaticParams = async (): Promise<{ slug: string }[]> => {
  try {
    const slugs = await getPostSlugs();
    return slugs.map(slug => ({ slug }));
  } catch (error) {
    console.log(error);
    return [];
  }
};

interface AsyncParams {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({ params }: AsyncParams): Promise<Metadata> => {
  try {
    const { slug } = await params;
    return await getPostMetadata(slug);
  } catch (error) {
    console.log(error);
    return {};
  }
};

const BlogPost = async ({ params }: AsyncParams) => {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post.content) {
    notFound();
  }

  const { title, content } = post;

  return (
    <Card className="mx-auto my-8 max-w-2xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="prose dark:prose-invert">
          <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
        </div>
        {/* <AudioPlayer text={content} /> */}
      </CardContent>
    </Card>
  );
};

export default BlogPost;
