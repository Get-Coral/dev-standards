// Shared types and helpers. Import the concrete client from the entry that
// matches your runtime: `@get-coral/telemetry/node` or
// `@get-coral/telemetry/browser`.
export {
	baseProperties,
	createNoopClient,
	DEFAULT_HOST,
	isTelemetryEnabled,
	type TelemetryClient,
	type TelemetryOptions,
} from "./core.js";
