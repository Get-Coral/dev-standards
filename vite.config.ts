import { defineConfig } from "vite-plus";

import { coralFmt } from "./packages/oxfmt-config/src/index.ts";
import { coralLint } from "./packages/oxlint-config/src/index.ts";

// dev-standards uses its own presets straight from source.
export default defineConfig({
	fmt: {
		...coralFmt,
		// Release Please writes these, so keep them in its format.
		ignorePatterns: [
			"**/CHANGELOG.md",
			".release-please-manifest.json",
			"release-please-config.json",
		],
	},
	lint: {
		extends: [coralLint],
		jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
		rules: { "vite-plus/prefer-vite-plus-imports": "error" },
		options: { typeAware: true, typeCheck: true },
	},
});
