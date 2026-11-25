import Image from 'next/image';
import { screenshots } from './assets';

interface PhoneScreenshotProps {
  src: keyof typeof screenshots.iphone;
  alt?: string;
  className?: string;
  priority?: boolean;
}

// The screenshots are small WebP files already, served as they are (unoptimized): the layout relies on their natural
// 720 px width (the hero phone has no set width), as on the standalone site.
export default function PhoneScreenshot({ src, alt = '', className = '', priority = false }: PhoneScreenshotProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="aspect-[9/19.5] bg-[#121212] rounded-[28px] lg:rounded-[32px] shadow-[0_40px_90px_rgba(20,45,31,0.14),0_10px_30px_rgba(20,45,31,0.08)] overflow-hidden border border-black/30">
        <Image
          src={screenshots.iphone[src]}
          alt={alt}
          width={720}
          height={1560}
          unoptimized
          priority={priority}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

interface WatchScreenshotProps {
  src: keyof typeof screenshots.watch;
  alt?: string;
  className?: string;
}

export function WatchScreenshot({ src, alt = '', className = '' }: WatchScreenshotProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="w-[90px] sm:w-[100px] lg:w-[110px] bg-[#111814] rounded-[1.6rem] lg:rounded-[1.8rem] border border-black/40 shadow-[0_20px_50px_rgba(20,45,31,0.18),0_6px_16px_rgba(20,45,31,0.08)] overflow-hidden">
        <Image
          src={screenshots.watch[src]}
          alt={alt}
          width={416}
          height={496}
          unoptimized
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function PhoneFrame({ children, className = '' }: PhoneFrameProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="aspect-[9/19.5] bg-[color:var(--lm-surface)] rounded-[28px] lg:rounded-[32px] shadow-[0_40px_90px_rgba(20,45,31,0.14),0_10px_30px_rgba(20,45,31,0.08)] overflow-hidden border border-[color:var(--lm-border)]">
        {children}
      </div>
    </div>
  );
}
