# PrettyPartners website

Customer-facing website only. Administration, native Auth, tenant accounts,
schema migrations and referral accounting belong to `ivailo-iliev/pretty-pencil`.

`https://prettypartners.app/p/<12-character-alias>` renders a public coupon using
the existing Supabase project's narrow `pretty_partner_offer_short` RPC. It uses
only the publishable browser key, never stores a login session, and never receives
customer names, contacts or commissions. Public validity is rechecked on load;
the merchant must still redeem through Pretty Pencil. Existing UUID links remain
working in Pretty Pencil. Code aliases are generated once in the shared database.

Run `npm test` and `node build.mjs`. Netlify deploys `dist` from this repository.
The root landing page is still a placeholder; rebuilding the legacy marketing
site is separate from the short-link change.
