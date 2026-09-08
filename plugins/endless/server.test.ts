import { createFakePluginHost } from "@riftlabs/plugin-sdk/testing";
import { describe, expect, it } from "vitest";

import plugin from "./server";

describe("Endless plugin", () => {
  it("loads through the rift plugin harness", async () => {
    const { rift, harness } = createFakePluginHost({ pluginId: "endless" });
    plugin(rift);
    expect(harness.inspection.logEntries.at(-1)?.message).toBe("Endless loaded");
    await harness.lifecycle.dispose();
  });
});
