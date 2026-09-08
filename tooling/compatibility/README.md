# Upstream compatibility evidence

The files in this directory preserve the original upstream BB 0.4.6-to-0.4.8 scaffold-upgrade fixture and host integration test. They target the historical upstream commit recorded in the fixture and are not part of this fork’s Rift validation.

Rift compatibility is checked with the vendored SDK 0.4.48 and the builder from Rift app 0.42.1 through the repository’s native typecheck, build, test, scaffold, and artifact checks. The former workflow that checked out and built the BB host has been retired. The original fixture remains unchanged for upstream provenance.
