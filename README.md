# Steam Manager

React + Vite app that lists your Steam library with prices from IsThereAnyDeal.

## Setup

Copy `.env.example` to `.env.local` and fill in:

- `VITE_STEAM_API_KEY` — https://steamcommunity.com/dev/apikey
- `VITE_STEAM_ID` — your 64-bit Steam ID
- `VITE_ITAD_API_KEY` — https://isthereanydeal.com/apps/my/

## Scripts

- `yarn start` — dev server at http://localhost:3000
- `yarn build` — production build in `dist/`
- `yarn preview` — serve the production build
- `yarn lint` — ESLint (neostandard)
