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

## Client design system

The client mirrors the landing page's visual language. When adding or changing UI in `client/`, follow these rules instead of inventing new styles:

- **Colors always come from the theme.** Use `useColors()` in components; never hardcode brand hexes. `client/constants/Colors.ts` holds the defaults (mirroring `global.css`) *and* the runtime override logic: on login the backend's university theme is applied via `applyThemedColors(light, dark)`, on logout `applyDefaultTheme()` restores the defaults. Any new UI must look right under an arbitrary university primary/background — do not break this flow.
- **Fixed design tokens live in `client/constants/Design.ts`**: `Fonts`, `Radius` (action 12 / card 16 / stamp 4 / pill 999) and `hardShadow()`. Use them; don't scatter magic numbers.
- **Typography** (matching the landing): Bricolage Grotesque for display text (titles, wordmark, button labels — `Fonts.display` / `Fonts.displayHeavy`), IBM Plex Mono for utility labels (section eyebrows, stamps, @handles, timestamps — `Fonts.mono`), system font for body text. These are static font files: never add `fontWeight` on top of them (Android would fake-bold).
- **The signature is the hard offset shadow** (landing's `box-shadow: 4px 4px 0 …`, here `hardShadow(colors.tint)`): primary actions use an inverted fill (`colors.text` background, `colors.background` label) plus that shadow, and *sink onto it* when pressed. It's already implemented in `SolidButton`, `ModalHeader`'s action, the home FAB and the nav main bubble — reuse those; don't re-implement it ad hoc.
- **Component vocabulary**: `SolidButton` (primary), `GhostButton` (secondary, tinted border), `Stamp` (rotated mono eyebrow), `Highlight` (marker swipe behind a word), `SectionLabel` (mono section header), `ModalHeader` (shared modal top bar). Prefer extending these over creating parallel variants.
- **Content stays flat**: feed/cards use hairline borders and dividers, typography-first, no soft drop shadows. Boldness is reserved for actions.
- **Navigation is the floating bubble** that fans out its options — do not replace it with a full-width tab bar.

## Code quality

All code in this repo — and especially anything new in `client/` — must be clean, understandable and easy to maintain. Concretely:

- No unnecessary complexity: no speculative abstractions, no config/props "just in case", no clever one-liners where three plain lines are clearer. Solve the problem in front of you.
- Components do one job and take simple, typed props. Shared behavior goes into the existing component vocabulary or tokens, not copy-paste.
- Delete dead code instead of keeping it around; if something is unused, remove it (git remembers).
- Comments are written in English (the codebase is English) and only where the code cannot say it itself — constraints, gotchas, non-obvious "whys". No comments that narrate the obvious.
- Keep business logic (services, hooks) separate from presentation; screens compose components and call services, nothing more.
