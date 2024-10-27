import type { ImgHTMLAttributes } from 'react';

export const BlogImg = ({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    src={src}
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    alt={alt || 'Blog post image'}
    className="my-4 h-auto w-full rounded-md"
    {...props}
  />
);
