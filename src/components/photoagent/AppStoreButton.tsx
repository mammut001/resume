import type { Dictionary } from './dictionaries/en';
import { APP_STORE_LIVE, APP_STORE_URL } from './site';
import AppleLogo from './AppleLogo';

/**
 * The App Store button. While PhotoAgent is not on sale (APP_STORE_LIVE is false) it reads "Coming soon" and is not a
 * link; flipping the flag turns every button into a link to the App Store.
 */
export default function AppStoreButton({
  dict,
  live = APP_STORE_LIVE,
  placement,
}: {
  dict: Dictionary['appStore'];
  live?: boolean;
  placement: string;
}) {
  if (!live) {
    return (
      <span className="pa-btn-primary" aria-disabled="true" data-app-store="soon" data-placement={placement}>
        <AppleLogo />
        {dict.soon}
      </span>
    );
  }
  return (
    <a href={APP_STORE_URL} className="pa-btn-primary" data-app-store="link" data-placement={placement}>
      <AppleLogo />
      {dict.download}
    </a>
  );
}
