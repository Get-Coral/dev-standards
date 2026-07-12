import { describe, expect, it } from "vitest";
import { createNoopClient, isTelemetryEnabled } from "./core.js";

describe("isTelemetryEnabled (opt-out semantics)", () => {
	const key = "phc_test";

	it("is enabled by default when a key is present", () => {
		expect(isTelemetryEnabled({ apiKey: key, env: {} })).toBe(true);
	});

	it("is disabled without an api key", () => {
		expect(isTelemetryEnabled({ env: {} })).toBe(false);
		expect(isTelemetryEnabled({ apiKey: "", env: {} })).toBe(false);
	});

	it("honors an explicit disabled override", () => {
		expect(isTelemetryEnabled({ apiKey: key, disabled: true, env: {} })).toBe(
			false,
		);
	});

	it("honors DO_NOT_TRACK", () => {
		expect(
			isTelemetryEnabled({ apiKey: key, env: { DO_NOT_TRACK: "1" } }),
		).toBe(false);
		expect(
			isTelemetryEnabled({ apiKey: key, env: { DO_NOT_TRACK: "true" } }),
		).toBe(false);
	});

	it("honors CORAL_TELEMETRY off values", () => {
		for (const v of ["0", "false", "off", "no", "disabled", "OFF"]) {
			expect(
				isTelemetryEnabled({ apiKey: key, env: { CORAL_TELEMETRY: v } }),
			).toBe(false);
		}
	});

	it("stays enabled for non-off CORAL_TELEMETRY values", () => {
		expect(
			isTelemetryEnabled({ apiKey: key, env: { CORAL_TELEMETRY: "1" } }),
		).toBe(true);
		expect(
			isTelemetryEnabled({ apiKey: key, env: { CORAL_TELEMETRY: "on" } }),
		).toBe(true);
	});
});

describe("createNoopClient", () => {
	it("reports disabled and never throws", async () => {
		const c = createNoopClient();
		expect(c.enabled).toBe(false);
		c.capture("x", { a: 1 });
		c.captureException(new Error("y"));
		await c.flush();
		await c.shutdown();
	});
});
