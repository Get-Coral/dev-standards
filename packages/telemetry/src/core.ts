/**
 * Shared, environment-agnostic core for Coral telemetry.
 *
 * Telemetry is **anonymous and opt-out**: enabled by default when a PostHog
 * key is configured, and silently disabled by a missing key, the
 * `CORAL_TELEMETRY` env var, or the cross-tool `DO_NOT_TRACK` standard. It
 * never collects PII — only a random per-install id and coarse event
 * properties the caller passes in.
 */

export interface TelemetryOptions {
	/** The Coral module sending events, e.g. "aurora" or "create-coral". */
	module: string;
	/** Module version, so events can be grouped by release. */
	version?: string;
	/**
	 * PostHog project API key. When absent, the client is a no-op — this is
	 * what keeps forks and un-configured builds from ever phoning home.
	 */
	apiKey?: string;
	/** PostHog ingest host. Defaults to the EU cloud endpoint. */
	host?: string;
	/** Hard override (e.g. a user-facing setting) that force-disables telemetry. */
	disabled?: boolean;
}

export const DEFAULT_HOST = "https://eu.i.posthog.com";

const OFF_VALUES = new Set(["0", "false", "off", "no", "disabled"]);

/**
 * Decide whether telemetry should run. Opt-out precedence:
 * explicit `disabled` → missing key → DO_NOT_TRACK → CORAL_TELEMETRY=off.
 */
export function isTelemetryEnabled(input: {
	apiKey?: string;
	disabled?: boolean;
	env?: Record<string, string | undefined>;
}): boolean {
	if (input.disabled) return false;
	if (!input.apiKey) return false;

	const env =
		input.env ??
		(typeof process !== "undefined" && process.env ? process.env : {});

	const dnt = (env.DO_NOT_TRACK ?? "").toLowerCase();
	if (dnt === "1" || dnt === "true") return false;

	const flag = (env.CORAL_TELEMETRY ?? "").toLowerCase();
	if (OFF_VALUES.has(flag)) return false;

	return true;
}

export interface TelemetryClient {
	/** True when events are actually sent; false for the no-op client. */
	readonly enabled: boolean;
	/** Record an anonymous product event. */
	capture(event: string, properties?: Record<string, unknown>): void;
	/** Report an error/exception for the Sentry-style error view. */
	captureException(error: unknown, properties?: Record<string, unknown>): void;
	/** Flush buffered events (call before a short-lived process exits). */
	flush(): Promise<void>;
	/** Flush and release resources. */
	shutdown(): Promise<void>;
}

/** A client that does nothing — returned whenever telemetry is disabled. */
export function createNoopClient(): TelemetryClient {
	return {
		enabled: false,
		capture() {},
		captureException() {},
		async flush() {},
		async shutdown() {},
	};
}

/** Base properties attached to every event. */
export function baseProperties(
	opts: TelemetryOptions,
): Record<string, unknown> {
	return {
		module: opts.module,
		module_version: opts.version ?? null,
	};
}
