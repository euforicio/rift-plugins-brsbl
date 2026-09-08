// @vitest-environment jsdom

import {
  installTestPluginRuntime,
  loadPluginApp,
} from "@riftlabs/plugin-sdk/testing/app";
import { describe, expect, it, vi } from "vitest";

interface Deferred<T> {
  promise: Promise<T>;
  resolve(value: T): void;
  reject(error: unknown): void;
}

function deferred<T>(): Deferred<T> {
  let resolve!: (value: T) => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, reject, resolve };
}

describe("Improve Prompt app registration", () => {
  it("persists helper choices in selection order and ignores stale failures", async () => {
    installTestPluginRuntime();
    const { createHelperExecutionSaveQueue } = await import("./app.js");
    const first = deferred<void>();
    const second = deferred<void>();
    const save = vi
      .fn()
      .mockImplementationOnce(() => first.promise)
      .mockImplementationOnce(() => second.promise);
    const results: boolean[] = [];
    const enqueue = createHelperExecutionSaveQueue(save, (failed) =>
      results.push(failed),
    );
    const firstChoice = {
      mode: "fixed" as const,
      providerId: "codex",
      model: "first",
    };
    const latestChoice = {
      mode: "fixed" as const,
      providerId: "codex",
      model: "latest",
    };

    enqueue(firstChoice);
    enqueue(latestChoice);
    await vi.waitFor(() => expect(save).toHaveBeenCalledTimes(1));
    expect(save).toHaveBeenLastCalledWith(firstChoice);

    first.reject(new Error("stale save failed"));
    await first.promise.catch(() => undefined);
    await vi.waitFor(() => expect(save).toHaveBeenCalledTimes(2));
    expect(save).toHaveBeenLastCalledWith(latestChoice);
    expect(results).toEqual([]);

    second.resolve();
    await second.promise;
    await vi.waitFor(() => expect(results).toEqual([false]));
  });

  it("registers thread status, the composer action, and helper settings", async () => {
    const app = await loadPluginApp(() => import("./app.js"));

    expect(app.contentScripts.map(({ id }) => id)).toEqual(["thread-status"]);
    expect(app.composerCustomizations.map(({ id }) => id)).toEqual([
      "improve-prompt",
    ]);
    expect(app.settingsSections.map(({ id }) => id)).toEqual([
      "improve-prompt",
    ]);
  });
});
