import { createReadStream } from 'fs';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

import { cache } from 'react';
import 'server-only';

interface PostMetadata {
  title: string;
  date: string;
  description: string;
  slug: string;
  author: string;
  previewImage?: string;
}

interface Post extends PostMetadata {
  content: string;
}

const postsDir = join(process.cwd(), 'content/posts');
const makeMdPath = cache((slug: string) => join(postsDir, `${slug}.md`));

export const getPostSlugs = cache(async (): Promise<string[]> => {
  try {
    const filenames = await readdir(postsDir);
    return filenames.map(filename => filename.replace(/\.md$/, ''));
  } catch (error) {
    console.log(error);
    return [];
  }
});

const readFrontmatter = async (filePath: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const stream = createReadStream(filePath, { encoding: 'utf8' });

    let frontmatter = '';
    let isFrontmatterOpen = false;

    const handleData = (chunk: string) => {
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.trim() === '---') {
          if (isFrontmatterOpen) {
            stream.close();
            resolve(frontmatter);
            return;
          }

          isFrontmatterOpen = true;

          continue;
        }

        if (isFrontmatterOpen) {
          frontmatter += line + '\n';
        }
      }
    };

    stream.on('data', handleData);
    stream.on('close', () => resolve(frontmatter));
    stream.on('error', reject);
  });

const emptyPostMetadata: PostMetadata = Object.freeze({
  title: '',
  description: '',
  date: '',
  slug: '',
  author: '',
  previewImage: undefined,
});

const parseMetadata = (frontmatter: string): PostMetadata => {
  try {
    return {
      ...emptyPostMetadata,
      ...Object.fromEntries(
        frontmatter
          .trim()
          .split('\n')
          .map(line => {
            const [key, ...valueParts] = line.split(':');
            return [key.trim(), valueParts.join(':').trim()];
          })
      ),
    };
  } catch (error) {
    console.log(error);
    return emptyPostMetadata;
  }
};

export const getPostMetadata = cache(async (slug: string): Promise<PostMetadata> => {
  try {
    const filePath = makeMdPath(slug);
    const frontmatter = await readFrontmatter(filePath);
    const metadata = parseMetadata(frontmatter);
    return { ...metadata, slug };
  } catch (error) {
    console.log(error);
    return { ...emptyPostMetadata, slug };
  }
});

export const getAllPostsMetadata = cache(async (): Promise<PostMetadata[]> => {
  try {
    const slugs = await getPostSlugs();
    const postsMetadata = await Promise.all(slugs.map(getPostMetadata));
    return postsMetadata.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.log(error);
    return [];
  }
});

export const getPost = cache(async (slug: string): Promise<Post> => {
  try {
    const filePath = makeMdPath(slug);
    const fileContent = await readFile(filePath, 'utf8');
    const [, frontmatter, content] = fileContent.split('---');
    const metadata = parseMetadata(frontmatter);
    return { ...metadata, content: content.trim() };
  } catch (error) {
    console.log(error);
    return { ...emptyPostMetadata, content: '' };
  }
});
