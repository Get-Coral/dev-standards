# @get-coral/dev-standards

[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-ElianCodes-ea4aaa?logo=githubsponsors&logoColor=white)](https://github.com/sponsors/ElianCodes)
[![Discord](https://img.shields.io/discord/1495441903297237043?label=Discord&logo=discord&logoColor=white&color=5865F2)](https://discord.gg/M3wzFpGbzp)

Shared, versioned development defaults for Coral repositories.

## Packages

- `@get-coral/biome-config`: shared Biome formatting, linting, and import organization rules.
- `@get-coral/tsconfig`: shared TypeScript defaults for Coral web modules.

## Automated publish flow

1. Push conventional commits to `main`.
2. Release Please opens or updates release PRs for changed packages.
3. Merge the release PR.
4. The release workflow publishes `@get-coral/biome-config` and `@get-coral/tsconfig` to npm.

Required GitHub secret:

- `NPM_TOKEN`: npm automation token with publish access to the `@get-coral` scope.

Workflows:

- `.github/workflows/ci.yml`
- `.github/workflows/release-please.yml`

## Consumption in templates and repos

- Biome: `extends` from `@get-coral/biome-config`.
- TypeScript: `extends` from `@get-coral/tsconfig`.

This gives all newly scaffolded repositories consistent defaults while allowing controlled version upgrades over time.
