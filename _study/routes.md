example folder structure

```txt
app/
├── actions/
│   └── posts.ts           // Contains server action functions; no route created
├── utils/
│   └── helpers.ts         // Utility functions; no route created
├── posts/
│   ├── page.tsx           // Route: /posts
│   ├── [slug]/
│   │   ├── page.tsx       // Route: /posts/:slug
│   │   ├── layout.tsx      // Layout for /posts/:slug
│   │   └── error.tsx       // Error handling for /posts/:slug
│   └── index.tsx          // Route: /posts (default)
└── layout.tsx             // Root layout for all routes
```

`app/api/tts/route.ts`

```ts
import { Readable } from 'stream';

import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

const client = new TextToSpeechClient();

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { text } = await req.json();

  try {
    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
      audioConfig: { audioEncoding: 'MP3' },
    });

    const audioContent = response.audioContent as Buffer;
    const stream = Readable.from(audioContent);

    return new NextResponse(stream as any, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('Error in TTS:', error);
    return NextResponse.json({ error: 'TTS failed' }, { status: 500 });
  }
};
```
