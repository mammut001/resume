export type DomainId = 'focus' | 'earn' | 'move' | 'spend';

/** solid fills (white text sits on them), text for the colour on the page background, soft for tinted chips. */
type Accent = { solid: string; text: string; soft: string };

/** Mirrors LifeMintPalette in the app so the site and the UI agree. The values live in lifemint.css, per theme. */
export const DOMAIN_ACCENT: Record<DomainId, Accent> = {
  focus: { solid: 'var(--lm-domain-focus)', text: 'var(--lm-domain-focus-text)', soft: 'var(--lm-domain-focus-soft)' },
  earn: { solid: 'var(--lm-domain-earn)', text: 'var(--lm-domain-earn-text)', soft: 'var(--lm-domain-earn-soft)' },
  move: { solid: 'var(--lm-domain-move)', text: 'var(--lm-domain-move-text)', soft: 'var(--lm-domain-move-soft)' },
  spend: { solid: 'var(--lm-domain-spend)', text: 'var(--lm-domain-spend-text)', soft: 'var(--lm-domain-spend-soft)' },
};
