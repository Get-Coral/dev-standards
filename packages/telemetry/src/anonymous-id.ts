import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";

/**
 * A stable, random, non-identifying id for this install. Persisted under the
 * user's home dir so repeat runs of a CLI (or restarts of a server) count as
 * the same anonymous source, while carrying nothing about who they are.
 * Deleting the file resets it. Falls back to an ephemeral id if the disk is
 * not writable.
 */
export function getOrCreateAnonymousId(): string {
	const dir = join(homedir() || tmpdir(), ".coral");
	const file = join(dir, "telemetry-id");

	try {
		if (existsSync(file)) {
			const existing = readFileSync(file, "utf8").trim();
			if (existing) return existing;
		}
		const id = randomUUID();
		mkdirSync(dir, { recursive: true });
		writeFileSync(file, id, "utf8");
		return id;
	} catch {
		// Read-only or sandboxed environment — use a per-process id instead.
		return randomUUID();
	}
}
