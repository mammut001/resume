/** Small drawn symbols for the demo tiles. Decorative: the tiles carry their own labels. */
export type GlyphName =
  | 'cat'
  | 'tree'
  | 'food'
  | 'city'
  | 'car'
  | 'sunset'
  | 'screenshot'
  | 'cake'
  | 'beach'
  | 'waves'
  | 'dog'
  | 'mic'
  | 'lock'
  | 'cloudOff'
  | 'user'
  | 'check2'
  | 'trash'
  | 'map'
  | 'video'
  | 'album'
  | 'heart'
  | 'chat'
  | 'globe'
  | 'copy'
  | 'calendar'
  | 'sparkle';

const paths: Record<GlyphName, React.ReactNode> = {
  video: (
    <>
      <rect x="3" y="6.5" width="13" height="11" rx="2.5" />
      <path d="M16 10.5 L21 7.5 L21 16.5 L16 13.5" />
    </>
  ),
  album: (
    <>
      <rect x="3.5" y="7" width="13.5" height="13" rx="2.5" />
      <path d="M7 4 L18.5 4 Q20.5 4 20.5 6 L20.5 16.5" />
      <path d="M3.5 17 L8 12.5 L11 15.5 L13 13.5 L17 17.5" />
    </>
  ),
  heart: <path d="M12 20 Q3.5 14.5 3.5 9 Q3.5 5 7.5 5 Q10.5 5 12 8 Q13.5 5 16.5 5 Q20.5 5 20.5 9 Q20.5 14.5 12 20 Z" />,
  chat: (
    <>
      <path d="M4 5.5 L20 5.5 Q21 5.5 21 6.5 L21 15.5 Q21 16.5 20 16.5 L10 16.5 L5.5 20 L6 16.5 L4 16.5 Q3 16.5 3 15.5 L3 6.5 Q3 5.5 4 5.5 Z" />
      <path d="M10 9.3 Q10 7.8 12 7.8 Q14 7.8 14 9.4 Q14 10.6 12 11.3 L12 12.3 M12 14.3 L12 14.4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12 L20.5 12 M12 3.5 Q16 8 16 12 Q16 16 12 20.5 Q8 16 8 12 Q8 8 12 3.5 Z" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="2.5" />
      <path d="M16 8 L16 6 Q16 4 14 4 L6 4 Q4 4 4 6 L4 14 Q4 16 6 16 L8 16" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10 L20.5 10 M8 3 L8 7 M16 3 L16 7 M8 14 L9 14 M12 14 L13 14 M16 14 L17 14" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3 L13.8 9.2 L20 11 L13.8 12.8 L12 19 L10.2 12.8 L4 11 L10.2 9.2 Z" />
      <path d="M19 17 L19 21 M17 19 L21 19" />
    </>
  ),
  cat: (
    <>
      <path d="M5 9 L5 4 L9 7 Q12 6 15 7 L19 4 L19 9 Q20 11 20 13 Q20 19 12 19 Q4 19 4 13 Q4 11 5 9 Z" />
      <circle cx="9.3" cy="12.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.7" cy="12.5" r="1" fill="currentColor" stroke="none" />
      <path d="M11 15 L12 16 L13 15" />
    </>
  ),
  dog: (
    <>
      <path d="M7 7 Q4 6 3.5 10 Q3.5 13 6 13" />
      <path d="M17 7 Q20 6 20.5 10 Q20.5 13 18 13" />
      <path d="M7 7 Q12 4.5 17 7 L18 14 Q17.5 19.5 12 19.5 Q6.5 19.5 6 14 Z" />
      <circle cx="9.7" cy="11.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.3" cy="11.5" r="1" fill="currentColor" stroke="none" />
      <path d="M11 15 Q12 16 13 15" />
    </>
  ),
  tree: (
    <>
      <path d="M12 3 Q18 5 18 11 Q18 15 12 15 Q6 15 6 11 Q6 5 12 3 Z" />
      <path d="M12 15 L12 21 M9 21 L15 21" />
    </>
  ),
  food: (
    <>
      <path d="M3.5 12 L20.5 12 Q20 19 12 19 Q4 19 3.5 12 Z" />
      <path d="M9 9 Q10 7 9 5 M13 9 Q14 7 13 5 M17 6 L13.5 11" />
    </>
  ),
  city: (
    <>
      <path d="M4 20 L4 9 L10 9 L10 20 M10 20 L10 4 L16 4 L16 20 M16 20 L16 12 L20 12 L20 20 M3 20 L21 20" />
      <path d="M12.5 7.5 L13.5 7.5 M12.5 11 L13.5 11 M6.5 12.5 L7.5 12.5" />
    </>
  ),
  car: (
    <>
      <path d="M4 16 L4 12.5 L6.5 8 L17.5 8 L20 12.5 L20 16 Z M4 12.5 L20 12.5" />
      <circle cx="7.5" cy="17" r="1.6" />
      <circle cx="16.5" cy="17" r="1.6" />
    </>
  ),
  sunset: (
    <>
      <path d="M6.5 15 A5.5 5.5 0 0 1 17.5 15" />
      <path d="M3 15 L21 15 M6 19 L18 19 M12 4 L12 6.5 M5 7.5 L6.6 9.1 M19 7.5 L17.4 9.1" />
    </>
  ),
  screenshot: (
    <>
      <rect x="6.5" y="3" width="11" height="18" rx="2.4" />
      <path d="M9.5 8 L14.5 8 M9.5 11 L14.5 11 M9.5 14 L12.5 14" />
    </>
  ),
  cake: (
    <>
      <path d="M4.5 20 L4.5 13 Q4.5 11.5 6 11.5 L18 11.5 Q19.5 11.5 19.5 13 L19.5 20 Z M3 20 L21 20" />
      <path d="M4.5 15.5 Q8 17.5 12 15.5 Q16 13.5 19.5 15.5 M12 11.5 L12 8 M12 5 Q13.2 6.4 12 8 Q10.8 6.4 12 5 Z" />
    </>
  ),
  beach: (
    <>
      <path d="M4 11 Q11 2 19 9 Z" />
      <path d="M11.5 7.5 L15 20 M3 20 Q12 17 21 20" />
    </>
  ),
  waves: (
    <>
      <path d="M3 9 Q6 6.5 9 9 T15 9 T21 9" />
      <path d="M3 13.5 Q6 11 9 13.5 T15 13.5 T21 13.5" />
      <path d="M3 18 Q6 15.5 9 18 T15 18 T21 18" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11 Q5.5 17.5 12 17.5 Q18.5 17.5 18.5 11 M12 17.5 L12 21 M8.5 21 L15.5 21" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
      <path d="M8 10.5 L8 7.5 Q8 3.5 12 3.5 Q16 3.5 16 7.5 L16 10.5 M12 14.5 L12 16.5" />
    </>
  ),
  cloudOff: (
    <>
      <path d="M7 18 Q3 18 3 14.5 Q3 11.2 6.4 11 Q7.2 6.5 12 6.5 Q15.4 6.5 16.8 9.3 Q21 9.6 21 13.8 Q21 18 17 18 Z" />
      <path d="M4 4 L20 20" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.8" />
      <path d="M4.5 20 Q5.5 14 12 14 Q18.5 14 19.5 20" />
      <path d="M3.5 3.5 L20.5 20.5" />
    </>
  ),
  check2: (
    <>
      <path d="M3 12.5 L7 16.5 L15 8" />
      <path d="M10.5 15 L12 16.5 L21 7" />
    </>
  ),
  trash: (
    <>
      <path d="M4 6.5 L20 6.5 M9.5 6.5 L9.5 4 L14.5 4 L14.5 6.5 M6 6.5 L7 20 L17 20 L18 6.5" />
      <path d="M10 10 L10 16.5 M14 10 L14 16.5" />
    </>
  ),
  map: (
    <>
      <path d="M12 21 Q5.5 14.5 5.5 9.8 Q5.5 3.5 12 3.5 Q18.5 3.5 18.5 9.8 Q18.5 14.5 12 21 Z" />
      <circle cx="12" cy="9.8" r="2.4" />
    </>
  ),
};

export default function Glyph({ name, className = 'w-6 h-6' }: { name: GlyphName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
