import Image from 'next/image';

interface PhoneScreenshotProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  /** The rendered width, for the image's srcset. */
  sizes?: string;
}

/** An iPhone-shaped frame around a 1320 × 2868 screenshot. */
export default function PhoneScreenshot({ src, alt, className = '', priority = false, sizes = '290px' }: PhoneScreenshotProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="aspect-[1320/2868] rounded-[34px] p-[7px] shadow-[var(--pa-shadow-lift)]"
        style={{ background: 'var(--pa-frame)' }}
      >
        <Image
          src={src}
          alt={alt}
          width={660}
          height={1434}
          sizes={sizes}
          priority={priority}
          className="w-full h-full object-cover rounded-[28px] bg-[var(--pa-page)]"
        />
      </div>
    </div>
  );
}

/** The same frame around drawn content, for the interactive demos. */
export function PhoneFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="rounded-[40px] p-[9px] shadow-[var(--pa-shadow-lift)]" style={{ background: 'var(--pa-frame)' }}>
        <div className="relative rounded-[32px] overflow-hidden bg-[var(--pa-page)]">{children}</div>
      </div>
    </div>
  );
}
