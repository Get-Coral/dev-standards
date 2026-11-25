# @get-coral/biome-config

> **Deprecated.** Coral repositories now use Vite+ with Oxlint and Oxfmt. Use [`@get-coral/oxlint-config`](../oxlint-config) and [`@get-coral/oxfmt-config`](../oxfmt-config) instead. This package stays published for repositories that have not moved yet.

Shared Biome defaults used across Coral repositories.

## Install

```bash
pnpm add -D @get-coral/biome-config
```

## Usage

In your repository `biome.json`:

```json
{
	"$schema": "https://biomejs.dev/schemas/2.4.11/schema.json",
	"extends": ["./node_modules/@get-coral/biome-config/base.jsonc"]
}
```

Add repository-specific includes and overrides in your local `biome.json`.
