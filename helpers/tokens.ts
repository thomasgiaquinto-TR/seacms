import { ProfilePage } from '../page-objects/ProfilePage';

export interface AcquiredToken {
  token: string;
  /** True when minted via the UI in this run (and therefore should be removed). */
  minted: boolean;
}

/**
 * Get an Authentication Token for API calls: prefer the env-configured API_TOKEN
 * (stable, session-independent), otherwise mint one via the User Profile screen.
 */
export async function acquireApiToken(profile: ProfilePage, name: string): Promise<AcquiredToken> {
  if (process.env.API_TOKEN) return { token: process.env.API_TOKEN, minted: false };
  await profile.goto();
  const token = await profile.createTokenAndReveal(name);
  return { token, minted: true };
}

/** Remove a UI-minted token (no-op for env tokens); best-effort. */
export async function removeMintedToken(
  profile: ProfilePage,
  name: string,
  minted: boolean,
): Promise<void> {
  if (!minted) return;
  await profile.removeToken(name).catch(() => {
    /* best-effort: leftover marker-named tokens are bounded and harmless */
  });
}
