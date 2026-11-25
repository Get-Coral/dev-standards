# @get-coral/oxlint-config

Shared [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) rules for Coral repositories. It replaces `@get-coral/biome-config` for linting; formatting lives in [`@get-coral/oxfmt-config`](../oxfmt-config).

## Install

```bash
pnpm add -D vite-plus @get-coral/oxlint-config
```

## Usage

In your repository `vite.config.ts`:

```ts
import { coralReactLint } from "@get-coral/oxlint-config";
import { defineConfig } from "vite-plus";

export default defineConfig({
	lint: {
		extends: [coralReactLint],
		options: { typeAware: true, typeCheck: true },
		rules: {
			// Repository-specific overrides.
		},
	},
});
```

Two presets are exported:

- `coralLint`: TypeScript, unicorn, oxc and import plugins, with the `correctness` category as errors and `suspicious` as warnings.
- `coralReactLint`: `coralLint` plus the React (including the rules of hooks) and JSX accessibility plugins.

Both ignore `dist` and TanStack Router's generated `routeTree.gen.ts`, and allow `console` in test files.

The objects also work without Vite+, from an `oxlint.config.ts`:

```ts
import { coralLint } from "@get-coral/oxlint-config";
import { defineConfig } from "oxlint";

export default defineConfig({ extends: [coralLint] });
```

## From Biome

| Biome rule                                  | Oxlint rule                       |
| ------------------------------------------- | --------------------------------- |
| `suspicious/noDebugger`                     | `no-debugger`                     |
| `suspicious/noConsole`                      | `no-console`                      |
| `suspicious/noDoubleEquals`                 | `eqeqeq`                          |
| `style/useConst`                            | `prefer-const`                    |
| `style/useTemplate`                         | `prefer-template`                 |
| `complexity/noExcessiveCognitiveComplexity` | `complexity` (cyclomatic, max 20) |
| `suspicious/noArrayIndexKey`                | `react/no-array-index-key`        |
| `correctness/useExhaustiveDependencies`     | `react/exhaustive-deps`           |
| `correctness/useHookAtTopLevel`             | `react/rules-of-hooks`            |
| `a11y/*`                                    | `jsx-a11y/*`                      |

Replace `// biome-ignore lint/<group>/<rule>: reason` comments with `// oxlint-disable-next-line <rule> -- reason`.
