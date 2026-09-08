import type { RiftPluginApi } from "@riftlabs/plugin-sdk";

export default function plugin(rift: RiftPluginApi): void {
  rift.log.info("Endless loaded");
}
