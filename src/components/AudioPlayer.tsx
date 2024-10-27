'use client';

import { Pause, Play, Volume2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '~/components/ui/button';

export const AudioPlayer = ({ text }: { text: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = async () => {
    if (isPlaying) {
      // Stop playback logic here
      setIsPlaying(false);
    } else {
      try {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const audio = new Audio(url);

          void audio.play();

          setIsPlaying(true);
          audio.onended = () => setIsPlaying(false);
        }
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  };

  return (
    <div className="flex items-center justify-between">
      <Button onClick={togglePlayback} className="flex items-center space-x-2">
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        <span>{isPlaying ? 'Pause' : 'Read Aloud'}</span>
      </Button>
      <Volume2 className="h-6 w-6 text-gray-500" />
    </div>
  );
};
