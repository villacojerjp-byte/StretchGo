# Stretch

A minimal, **black-and-white** stretching & flexibility app built with **React Native (Expo) + EAS**.

The app structure follows a classic stretching-app flow (onboarding questionnaire →
paywall → daily routine → guided session player → progress tracking), reimagined with a
calm, editorial, monochrome aesthetic and a gentle daily-checklist habit loop.

## Design language

- **Strictly black & white** — no color anywhere. Hierarchy comes from neutrals,
  type weight, and spacing.
- **Editorial type pairing** — `Fraunces` (display serif) for headlines and big numbers,
  `Inter` (sans) for UI text.
- **Custom monochrome line-art** — every stretch pose is an original SVG figure
  (`src/components/PoseArt.tsx`), so there are no raster image dependencies.

## Features

- **Onboarding questionnaire** — goal, flexibility level, focus areas, frequency, and
  reminder time, ending in an animated "building your plan" screen.
- **Paywall** — yearly / weekly plan selection (demo grants premium locally).
- **Today** — featured daily routine, a five-item daily "promises" checklist, an
  8-cup water tracker, and quick-pick routines.
- **Routines** — browse 8 guided routines with category filtering.
- **Session player** — get-ready countdown, per-pose timer with a progress ring,
  play / pause / skip controls, and a completion summary.
- **Progress** — streak, weekly activity strip, lifetime stats, and a 28-day
  consistency grid.
- **Profile** — plan summary, settings, and reset.
- **Local persistence** — all state is saved with `AsyncStorage`; streaks and stats
  survive app restarts.

## Project structure

```
app/                     # Expo Router screens (file-based routing)
  _layout.tsx            # Root: fonts, providers, navigation stack
  index.tsx              # Redirect → onboarding or tabs
  onboarding/            # Multi-step questionnaire
  paywall.tsx            # Subscription modal
  (tabs)/                # Today · Routines · Progress · Profile
  routine/[id].tsx       # Routine detail
  session/[id].tsx       # Guided session player
src/
  theme/                 # Design tokens (colors, type, spacing, radius)
  components/            # Reusable UI (Button, Card, ProgressRing, PoseArt, …)
  data/                  # Stretch routines + daily promises
  store/                 # AsyncStorage-backed app + onboarding state
  utils/                 # Date helpers
```

## Running locally

```bash
npm install --legacy-peer-deps
npx expo start          # then press a / i, or scan with a dev client
```

> This project pins `react-native-reanimated` v4, which requires
> `react-native-worklets` and a top-level `babel-preset-expo`; both are already listed
> as dependencies. Install with `--legacy-peer-deps` (Expo's installer does this too).

Type-check the project:

```bash
npm run typecheck
```

## Building with EAS

Profiles are defined in [`eas.json`](./eas.json):

```bash
npm install -g eas-cli
eas login
eas build:configure

# Internal test builds
eas build --profile preview --platform android
eas build --profile preview --platform ios

# Store builds
eas build --profile production --platform all
```

Bundle identifiers are set in `app.json` (`com.stretchgo.app`).
