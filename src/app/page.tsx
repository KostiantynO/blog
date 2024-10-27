import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { getAllPostsMetadata } from '~/lib/posts';

const PostsList = async () => {
  const posts = await getAllPostsMetadata();

  return (
    <div className="mx-auto my-8 max-w-4xl space-y-8">
      <h1 className="text-3xl font-bold">Blog Posts</h1>

      <ul className="grid grid-cols-3 gap-2">
        {posts.map(({ slug, title, description, date, previewImage }) => (
          <li key={slug}>
            <Link href={`/posts/${slug}`}>
              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>

                <CardContent>
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt={title}
                      className="mb-4 h-48 w-full rounded-md object-cover"
                    />
                  )}
                  <p className="text-muted-foreground">{description}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{date}</p>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
