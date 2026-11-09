export const supabaseUrl = 'https://kgtmsuluifdtdxddiamg.supabase.co';
// Publishable browser key; never add service-role credentials to this website.
export const publishableKey = 'sb_publishable_OnkEE5wb1POTOa_PcRpfIg_jwdFm021';

export function couponSlug(pathname) {
  return /^\/p\/([A-Za-z0-9_-]{12})\/?$/.exec(pathname)?.[1] ?? null;
}
export function artworkUrl(path) {
  return typeof path === 'string' && /^[0-9a-f-]{36}\/(logo|banner)\/[a-zA-Z0-9._-]+$/.test(path)
    ? `${supabaseUrl}/storage/v1/object/public/partner-artwork/${path}` : null;
}
export async function loadCoupon(slug) {
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/pretty_partner_offer_short`, {
    method: 'POST',
    headers: { apikey: publishableKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p_slug: slug }),
    cache: 'no-store',
    credentials: 'omit',
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error('coupon_unavailable');
  return response.json();
}
