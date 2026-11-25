import type { OxfmtConfig } from "vite-plus/fmt";

/**
 * Coral's shared Oxfmt options, the successor of `@get-coral/biome-config`'s
 * formatter settings (`oxfmt --migrate=biome` on that preset gives the same values).
 *
 * Use it from the `fmt` block of a Vite+ `vite.config.ts`:
 *
 * ```ts
 * import { coralFmt } from "@get-coral/oxfmt-config";
 *
 * export default defineConfig({ fmt: { ...coralFmt, ignorePatterns: ["src/routeTree.gen.ts"] } });
 * ```
 */
export const coralFmt = {
	useTabs: true,
	tabWidth: 2,
	printWidth: 100,
	endOfLine: "lf",
	singleQuote: false,
	jsxSingleQuote: false,
	quoteProps: "as-needed",
	trailingComma: "all",
	semi: true,
	arrowParens: "always",
	bracketSameLine: false,
	bracketSpacing: true,
	// Replaces Biome's `organizeImports` assist.
	sortImports: true,
} satisfies OxfmtConfig;

export default coralFmt;
