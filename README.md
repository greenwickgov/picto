# Picto — open beta release

Web-only open-source social network with photos, 24-hour Stories, Sniplets, real accounts, and private messaging. React, Vite, Convex, Convex Auth. MIT license.

## Release status

This branch replaces all seeded creators/posts and browser-local social data with real Convex operations. Deployment to the existing Picto backend is required before releasing it to main. Do not call the open beta operational until backend deployment and live signup/sign-in checks succeed. A service error boundary fails closed rather than displaying fake content.

## Development

Node 22+. `npm ci`, `npm test`, `npm run build`, `npm run dev`.

## Backend setup

Existing deployment: insightful-donkey-620 (Sydney).

1. Authenticate the official Convex CLI to this project or supply a deploy key through a secure environment. Never commit a credential.
2. Select `dev:insightful-donkey-620` as CONVEX_DEPLOYMENT locally. Never use the development deployment for ongoing production without reviewing Convex production configuration.
3. Run `node scripts/setup-auth.mjs` once for this deployment. It generates RS256 keys in memory and passes JWT_PRIVATE_KEY/JWKS to the official CLI through stdin. Do not re-run on an existing configured deployment without considering current sessions.
4. Run `npx convex dev --once` to deploy schema, auth HTTP routes, and functions.
5. Validate real signup, login, logout, profile onboarding, post upload, cross-account feed persistence, and private messages between two accounts. Delete any test-only data afterwards through an approved cleanup path.
6. Merge to main. GitHub Actions runs tests/build then publishes static frontend to Pages. Only the public Convex URL is compiled into the frontend; no deploy keys belong in GitHub Pages.

## Authentication and privacy

Email/password signup through Convex Auth. Passwords require 12–128 characters and are handled by the auth library, never browser local social storage. Unique handles are enforced server-side. Public profile queries omit email/auth user ID. Every write requires a valid session. Mutations enforce rate limits. Message reads/sends verify membership server-side; blocking stops messaging. Messages are not end-to-end encrypted.

Open beta limitations: password recovery and email verification are not configured yet; self-service account deletion is not available. These limits appear in the app. Do not claim verified email ownership. Add a transactional email provider, password recovery, operator moderation workflows, cursor pagination, storage cleanup, and account deletion before a wider production launch.

## Features

- Real empty community state; no seeded accounts/photos/video/likes/comments.
- FYP, following feed, caption search, member handle search, saved posts, profiles.
- Photos, 24-hour Stories, video Sniplets, media validation and ownership registration.
- Likes, follows, comments, owner-only post removal, reports, account blocking.
- Participant-only real-time messages and inbox.
- Raster PNG logo/wordmark; responsive glass rail with spacing fixes.

The automated security suite checks anonymous access, conversation isolation, server-derived sender, blocking, public-profile privacy, duplicate handles, message rate limits, empty feeds, and real password signup/login with incorrect-password rejection in an isolated Convex test backend. Tests use disposable data only and do not seed the live project.

## Branding and credits

`public/picto-icon.png` and `public/picto-wordmark.png` are generated raster logos. No SVG logos are rendered. Lucide UI controls retain upstream ISC licensing. Refraction engine: liquidglass.dev (MIT headers retained). Decorative landscape background: Unsplash; not a community post. The rest of the product contains real user content only.
