'use client';

import { Globe } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface BookmarkImageProps {
  src: string;
  alt: string;
}

export function BookmarkImage({ src, alt }: BookmarkImageProps) {
  const [error, setError] = useState(false);

  return (
    <>
      {error ? (
        <Globe className='h-8 w-8' />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={32}
          height={32}
          onError={() => setError(true)}
        />
      )}
    </>
  );
}
