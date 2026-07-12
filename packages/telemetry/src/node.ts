import { PostHog } from "posthog-node";
import { getOrCreateAnonymousId } from "./anonymous-id.js";
import {
	baseProperties,
	createNoopClient,
	DEFAULT_HOST,
	isTelemetryEnabled,
	type TelemetryClient,
	type TelemetryOptions,
} from "./core.js";

/**
 * Telemetry client for Node contexts — CLIs (create-coral) and server
 * runtimes (module SSR). Returns a no-op client when telemetry is disabled,
 * so callers can always call `.capture()` without guarding.
 */
export function createNodeTelemetry(opts: TelemetryOptions): TelemetryClient {
	if (!isTelemetryEnabled(opts)) return createNoopClient();

	const client = new PostHog(opts.apiKey as string, {
		host: opts.host ?? DEFAULT_HOST,
		// Short-lived processes: send promptly rather than buffering.
		flushAt: 1,
		flushInterval: 0,
	});
	const distinctId = getOrCreateAnonymousId();
	const base = baseProperties(opts);

	return {
		enabled: true,
		capture(event, properties) {
			client.capture({
				distinctId,
				event,
				properties: { ...base, ...properties },
			});
		},
		captureException(error, properties) {
			const err = error instanceof Error ? error : new Error(String(error));
			client.captureException(err, distinctId, { ...base, ...properties });
		},
		flush: () => client.flush().catch(() => {}),
		shutdown: () => client.shutdown().catch(() => {}),
	};
}

export {
	DEFAULT_HOST,
	isTelemetryEnabled,
	type TelemetryClient,
	type TelemetryOptions,
} from "./core.js";
