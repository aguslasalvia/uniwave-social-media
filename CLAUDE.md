# UniWave monorepo

Three projects: `client/` (Expo/React Native app), `server/` (Go/GORM/Postgres API), `landing-page/` (Astro marketing site).

## Brand colors must stay in sync across the whole repo

`landing-page/src/global.css` is the **source of truth** for UniWave's brand palette (`--primary-color`, `--primary-dark`, `--bg-color`, `--bg-secondary`). It is not to be edited as part of client redesign work (see below), but its color values must be mirrored everywhere else the brand appears:

- `client/constants/Colors.ts` — the `defaultColors` used for the unauthenticated/pre-login state (login screen, right after logout, before any backend theme has been fetched).
- `server/internal/config/database.go` — `defaultTheme` in `seedUniversities`, which is what a fresh database seeds for every university's theme (`core.University.Theme`, a `{light, dark}` pair of `{primary, background}`), returned to the client on login and applied via `applyThemedColors`.
- The app icon / logo assets (`client/assets/images/uniwave-logo-*`), whenever those are redesigned.

Current values (as of the landing-page redesign in progress):
- Light: primary `#6366f1`, background `#ffffff`
- Dark: primary `#818cf8`, background `#080c18`

**If you change one, change all of them together** — client default, backend seed default, and (if applicable) any already-seeded rows in the running dev database (`UPDATE universities SET theme = ...` via `docker exec -i postgres psql -U postgres -d uniwave`; editing the Go seed code alone does not affect an already-seeded database, since `seedUniversities` only runs when the `universities` table is empty).

Do not invent a new brand color independently in the client or backend without checking `landing-page/src/global.css` first.

## Redesign scope

UX/UI redesign work is scoped to `client/` only — never edit `landing-page/` (its own redesign is being done separately). Reading its colors/tokens for consistency (as above) is fine; editing its files is not, unless explicitly asked.
