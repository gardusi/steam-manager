# Steam Manager

React + Vite app that lists your Steam library with prices from IsThereAnyDeal.

## Setup

Copy `.env.example` to `.env.local` and fill in:

- `STEAM_API_KEY` — https://steamcommunity.com/dev/apikey
- `ITAD_API_KEY` — https://isthereanydeal.com/apps/my/ (optional; prices are skipped without it)
- `VITE_STEAM_ID` — your 64-bit Steam ID

API calls go through the Vite dev/preview server proxy (`/api/steam`, `/api/itad`), which
adds the keys server side, so they never end up in the browser bundle. This means the app
only works via `yarn start` or `yarn preview`, not as static files.

## Scripts

- `yarn start` — dev server at http://localhost:3000
- `yarn build` — production build in `dist/`
- `yarn preview` — serve the production build
- `yarn lint` — ESLint (neostandard)
