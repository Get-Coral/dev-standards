import type { OxlintConfig } from "vite-plus/lint";

/**
 * Coral's shared Oxlint rules for TypeScript code, the successor of
 * `@get-coral/biome-config`.
 *
 * Use it from the `lint` block of a Vite+ `vite.config.ts`:
 *
 * ```ts
 * import { coralLint } from "@get-coral/oxlint-config";
 *
 * export default defineConfig({ lint: { extends: [coralLint] } });
 * ```
 */
export const coralLint = {
	// Listing plugins replaces Oxlint's defaults, so the defaults are repeated here.
	plugins: ["typescript", "unicorn", "oxc", "import"],
	categories: {
		correctness: "error",
		suspicious: "warn",
	},
	rules: {
		// Biome `suspicious/noDebugger`, `noConsole`, `noDoubleEquals`.
		"no-debugger": "error",
		"no-console": "warn",
		eqeqeq: "warn",
		// Biome `style/useConst`, `useTemplate`.
		"prefer-const": "error",
		"prefer-template": "warn",
		// Biome `complexity/noExcessiveCognitiveComplexity` (max 18). Oxlint measures
		// cyclomatic rather than cognitive complexity, so the threshold is a little higher.
		complexity: ["warn", { max: 20 }],
	},
	ignorePatterns: ["**/dist/**", "**/routeTree.gen.ts"],
	overrides: [
		{
			files: ["**/*.test.*", "**/*.spec.*"],
			rules: {
				"no-console": "off",
			},
		},
	],
} satisfies OxlintConfig;

/**
 * `coralLint` plus React, the rules of hooks, and JSX accessibility, for Coral
 * modules built on React and TanStack Start.
 */
export const coralReactLint = {
	...coralLint,
	plugins: [...coralLint.plugins, "react", "jsx-a11y"],
	rules: {
		...coralLint.rules,
		"react/rules-of-hooks": "error",
		"react/exhaustive-deps": "warn",
		"react/no-array-index-key": "warn",
		// React 17+ uses the automatic JSX runtime.
		"react/react-in-jsx-scope": "off",
	},
} satisfies OxlintConfig;

export default coralLint;
