import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts", "src/node.ts", "src/browser.ts"],
	format: ["esm", "cjs"],
	dts: true,
	clean: true,
	// posthog-node / posthog-js are peer runtime deps, installed alongside.
	external: ["posthog-node", "posthog-js"],
});
