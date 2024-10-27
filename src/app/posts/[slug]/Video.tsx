interface VideoProps {
  node?: unknown;
  src?: string;
  controls?: boolean;
}

export const Video = ({ src }: VideoProps) => (
  <video controls style={{ maxWidth: '100%' }}>
    <source src={src} />
    Your browser does not support the video tag.
  </video>
);
