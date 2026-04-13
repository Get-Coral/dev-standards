# @get-coral/biome-config

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
