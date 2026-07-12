# @get-coral/telemetry

Anonymous, **opt-out** telemetry for Coral modules and CLIs. Wraps PostHog with
a single client that is a no-op unless a project key is configured, and that
respects `CORAL_TELEMETRY=0` and the cross-tool `DO_NOT_TRACK` standard. No PII
is collected — only a random per-install id and the event properties you pass.

## Install

```bash
pnpm add @get-coral/telemetry
```

## Node / CLI

```ts
import { createNodeTelemetry } from "@get-coral/telemetry/node";

const telemetry = createNodeTelemetry({
  module: "create-coral",
  version: "1.0.3",
  apiKey: process.env.CORAL_POSTHOG_KEY, // absent → no-op
});

telemetry.capture("module_scaffolded", { template: "default", installed: true });
await telemetry.shutdown(); // flush before a short-lived process exits
```

## Browser (module runtime)

```ts
import { createBrowserTelemetry } from "@get-coral/telemetry/browser";

const telemetry = createBrowserTelemetry({
  module: "aurora",
  version: "1.11.0",
  apiKey: import.meta.env.VITE_CORAL_POSTHOG_KEY,
});

telemetry.capture("playback_started", { media_type: "movie" });
// Unhandled errors are captured automatically for the error view.
```

## Opting out

Telemetry is disabled when any of these hold:

- no `apiKey` is provided (forks / un-configured builds never phone home)
- `disabled: true` is passed (wire this to a user-facing setting)
- `DO_NOT_TRACK=1`
- `CORAL_TELEMETRY` is `0` / `false` / `off` / `no` / `disabled`
