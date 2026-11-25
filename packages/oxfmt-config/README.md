# @get-coral/oxfmt-config

Shared [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) options for Coral repositories. It replaces `@get-coral/biome-config` for formatting; linting lives in [`@get-coral/oxlint-config`](../oxlint-config).

The options are what `oxfmt --migrate=biome` produces for the old Biome preset: tabs, a line width of 100, double quotes, trailing commas and semicolons. Imports are sorted, as Biome's `organizeImports` did.

## Install

```bash
pnpm add -D vite-plus @get-coral/oxfmt-config
```

## Usage

In your repository `vite.config.ts`:

```ts
import { coralFmt } from "@get-coral/oxfmt-config";
import { defineConfig } from "vite-plus";

export default defineConfig({
	fmt: {
		...coralFmt,
		ignorePatterns: ["src/routeTree.gen.ts"],
	},
});
```

Then run `vp fmt` to format, or `vp check` to format, lint and type-check in one go.

Editors: install the [Oxc extension](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode) and set it as the default formatter.
