import { defineConfig } from "vite-plus";

export default defineConfig({
	pack: {
		entry: ["src/index.ts", "src/node.ts", "src/browser.ts"],
		format: ["esm", "cjs"],
		dts: true,
		// Keep tsup's file names (index.js + index.cjs) so the published exports do not move.
		fixedExtension: false,
		publint: true,
		deps: {
			// posthog-node / posthog-js are runtime deps, installed alongside.
			neverBundle: ["posthog-node", "posthog-js"],
		},
	},
});
