# Picto

Open-source, web-only photo social app with FYP, Stories, Sniplets, Explore, Saved, and profiles. MIT licensed.

## GitHub Pages

The app is a static React + Vite build. No ChatGPT account, hosted server, or Sites platform is required.

Choose **Settings → Pages → Source → GitHub Actions**. The included workflow builds and publishes `dist/` on every push to `main`. Relative asset paths support repository subdirectories such as `/picto/` and custom domains.

## Development

Use Node 22. `npm ci`, `npm run dev`, and `npm run build`.

## Liquid glass

The UI includes a photographic backdrop, transparent layered panels, curved specular borders, blurred content, and live SVG displacement refraction using the vendored liquidglass.dev engine. Chromium renders backdrop refraction; other engines fall back to frosted blur. Refraction is intentionally restricted to compact controls for rendering performance. CSS glass styling covers navigation, profile cards, overlays, modals, and panels. `public/picto-glass.js` is the integration.

## Current functionality

This version is an interactive local preview. Demo creators and content are illustrative. Posts, profile edits, likes, comments, saves, and follows persist in the browser. Live accounts and shared data are not active.

## Convex backend

Backend source is in `convex/`, including profiles, feeds, posts, 24-hour Story filtering, Sniplets, uploads, comments, follows, likes/saves, reports, and owner-only hiding. Mutations require a server-verified identity.

Existing project: Picto. Development deployment: insightful-donkey-620 (Sydney). URL: https://insightful-donkey-620.ap-southeast-2.convex.cloud.

Authenticate with `npx convex login`, select the existing project with `npx convex dev --once`, and configure an OIDC provider via AUTH_ISSUER and AUTH_APPLICATION_ID in Convex. Complete the authenticated ConvexProvider frontend adapter before enabling live mode. Never place deployment credentials in frontend code. GitHub Pages hosts the frontend; Convex runs the backend separately.

Before public social-service launch: finish frontend authentication/data wiring, verify upload ownership, add rate limits and file cleanup, moderation/reporting workflows, blocked users, pagination, account deletion/export, and abuse controls. This preview is not production-ready as a shared social network.

## Credits

UI icons: Lucide (ISC). Refraction engine: liquidglass.dev (MIT, upstream headers retained). Sample images: Unsplash. Sample avatars: Pravatar. Sample video: Pexels. These assets have separate upstream terms. Brand concept sheet (`public/picto-brand-system.webp`) was AI generated; editable app mark is `public/favicon.svg`.
