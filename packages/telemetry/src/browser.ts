import posthog from "posthog-js";
import {
	baseProperties,
	createNoopClient,
	DEFAULT_HOST,
	isTelemetryEnabled,
	type TelemetryClient,
	type TelemetryOptions,
} from "./core.js";

export interface BrowserTelemetryOptions extends TelemetryOptions {
	/** Capture unhandled errors automatically for the error view. Default true. */
	captureErrors?: boolean;
}

/**
 * Telemetry client for the browser runtime of a Coral module. No-ops during
 * SSR (no `window`) and whenever telemetry is disabled. posthog-js manages its
 * own anonymous id in localStorage; person profiles are never created.
 */
export function createBrowserTelemetry(
	opts: BrowserTelemetryOptions,
): TelemetryClient {
	if (typeof window === "undefined" || !isTelemetryEnabled(opts)) {
		return createNoopClient();
	}

	posthog.init(opts.apiKey as string, {
		api_host: opts.host ?? DEFAULT_HOST,
		autocapture: false,
		capture_pageview: false,
		capture_pageleave: false,
		disable_session_recording: true,
		person_profiles: "never",
	});

	const base = baseProperties(opts);
	if (opts.captureErrors !== false) {
		window.addEventListener("error", (e) => {
			posthog.captureException(e.error ?? new Error(e.message), base);
		});
		window.addEventListener("unhandledrejection", (e) => {
			posthog.captureException(
				e.reason instanceof Error ? e.reason : new Error(String(e.reason)),
				base,
			);
		});
	}

	return {
		enabled: true,
		capture(event, properties) {
			posthog.capture(event, { ...base, ...properties });
		},
		captureException(error, properties) {
			const err = error instanceof Error ? error : new Error(String(error));
			posthog.captureException(err, { ...base, ...properties });
		},
		async flush() {
			// posthog-js flushes on its own schedule; nothing to await.
		},
		async shutdown() {
			posthog.reset();
		},
	};
}

export {
	DEFAULT_HOST,
	isTelemetryEnabled,
	type TelemetryClient,
	type TelemetryOptions,
} from "./core.js";
