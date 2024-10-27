import { BlogImg } from './BlogImg';
import { Video } from './Video';

import type { Components } from 'react-markdown';

export const markdownComponents: Components = {
  img: BlogImg,
  video: Video,
};
