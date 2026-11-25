# @get-coral/dev-standards

[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-ElianCodes-ea4aaa?logo=githubsponsors&logoColor=white)](https://github.com/sponsors/ElianCodes)
[![Discord](https://img.shields.io/discord/1495441903297237043?label=Discord&logo=discord&logoColor=white&color=5865F2)](https://discord.gg/M3wzFpGbzp)

Shared, versioned development defaults for Coral repositories.

## Packages

- `@get-coral/oxlint-config`: shared Oxlint rules, for the `lint` block of a Vite+ `vite.config.ts`.
- `@get-coral/oxfmt-config`: shared Oxfmt options, for the `fmt` block of a Vite+ `vite.config.ts`.
- `@get-coral/tsconfig`: shared TypeScript defaults for Coral web modules.
- `@get-coral/telemetry`: anonymous, opt-out telemetry client for Coral modules and CLIs.
- `@get-coral/biome-config`: **deprecated**, superseded by the two Oxc packages above.

## Automated publish flow

1. Push conventional commits to `main`.
2. Release Please opens or updates release PRs for changed packages.
3. Merge the release PR.
4. The release workflow publishes every package under `packages/` to npm.

Required GitHub secret:

- `NPM_TOKEN`: npm automation token with publish access to the `@get-coral` scope.

Workflows:

- `.github/workflows/ci.yml`
- `.github/workflows/release-please.yml`

## Consumption in templates and repos

- Lint and format (Vite+): `lint: { extends: [coralReactLint] }` and `fmt: { ...coralFmt }` in `vite.config.ts`.
- TypeScript: `extends` from `@get-coral/tsconfig`.

This repository uses Vite+ itself: `pnpm check` runs `vp check` (format, lint, type-aware lint) with the presets from source.

This gives all newly scaffolded repositories consistent defaults while allowing controlled version upgrades over time.
