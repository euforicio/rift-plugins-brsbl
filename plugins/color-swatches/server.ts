import type { RiftPluginApi } from "@riftlabs/plugin-sdk";

/**
 * All of the behaviour lives in the frontend content script; a plugin still
 * needs a backend entry, so this one only announces itself.
 */
export default async function plugin(rift: RiftPluginApi) {
  rift.log.info("color-swatches ready");
}
