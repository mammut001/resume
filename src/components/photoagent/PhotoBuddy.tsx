/**
 * The app's mascot, drawn as in PhotoAgent/DesignSystem/Components/PhotoBuddy.swift (100 × 100 canvas):
 * a cream photo frame with a sky-and-hill photo on top and a smiling face below.
 */
export default function PhotoBuddy({ className = 'w-16 h-16', bob = false }: { className?: string; bob?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className={`${className} ${bob ? 'pa-bob' : ''}`} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="buddy-window">
          <rect x="18" y="20" width="64" height="32" rx="10" />
        </clipPath>
      </defs>
      <rect x="8" y="11" width="84" height="84" rx="25" fill="#FFF1DE" stroke="#ECC7A0" strokeWidth="3.5" />
      <rect x="18" y="20" width="64" height="32" rx="10" fill="#9ED4F5" />
      <g clipPath="url(#buddy-window)">
        <circle cx="32" cy="30" r="6" fill="#FFCF4A" />
        <path d="M14 50 C34 34 62 33 86 40 L86 56 L14 56 Z" fill="#7FCB6E" />
      </g>
      <ellipse cx="23" cy="76" rx="7.5" ry="4.5" fill="#FFB3A7" opacity="0.9" />
      <ellipse cx="77" cy="76" rx="7.5" ry="4.5" fill="#FFB3A7" opacity="0.9" />
      <circle cx="35" cy="66" r="5.4" fill="#4A2340" />
      <circle cx="65" cy="66" r="5.4" fill="#4A2340" />
      <circle cx="35.3" cy="63" r="1.7" fill="#fff" opacity="0.95" />
      <circle cx="65.3" cy="63" r="1.7" fill="#fff" opacity="0.95" />
      <path d="M42 74 Q50 84 58 74" fill="none" stroke="#4A2340" strokeWidth="3.8" strokeLinecap="round" />
    </svg>
  );
}
