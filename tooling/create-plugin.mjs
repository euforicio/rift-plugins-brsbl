import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  pluginSdkArchive,
  pluginSdkVersion,
} from "./plugin-sdk-provenance.mjs";

const defaultRepositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function command(executable, args, repositoryRoot) {
  const result = spawnSync(executable, args, {
    cwd: repositoryRoot,
    stdio: "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${executable} ${args.join(" ")} exited ${result.status}`);
  }
}

function parseArguments(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--skip-install") options.skipInstall = true;
    else if (token === "--skip-verify") options.skipVerify = true;
    else {
      const value = argv[index + 1];
      if (!token.startsWith("--") || !value || value.startsWith("--")) {
        throw new Error(`invalid argument ${token}`);
      }
      index += 1;
      const key = token.slice(2);
      options[key] = value;
    }
  }
  return options;
}

function validateOptions(options) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(options.slug ?? "")) {
    throw new Error("--slug must use lowercase letters, numbers, and dashes");
  }
  for (const key of ["name", "description"]) {
    if (typeof options[key] !== "string" || options[key].trim() === "") {
      throw new Error(`--${key} is required`);
    }
  }
}

function filesFor(options) {
  const packageName = `rift-plugin-${options.slug}`;
  const installRef = `plugin/${options.slug}`;
  const loadedMessage = JSON.stringify(`${options.name} loaded`);
  const testName = JSON.stringify(`${options.name} plugin`);
  const manifest = {
    name: packageName,
    version: "0.1.0",
    description: options.description,
    type: "module",
    license: "UNLICENSED",
    files: ["dist", "README.md"],
    scripts: {
      build: "node ../../tooling/build-plugin.mjs",
      check: "npm run typecheck && npm run build && npm test",
      test: "vitest run",
      typecheck: "tsc --noEmit",
    },
    engines: { rift: ">=0.0.34", riftPluginSdk: `^${pluginSdkVersion}` },
    rift: {
      name: options.name,
      description: options.description,
      branding: { icon: "Puzzle" },
      server: "./server.ts",
      skills: [],
    },
    devDependencies: {
      "@riftlabs/plugin-sdk": pluginSdkVersion,
      "@types/better-sqlite3": "^7.6.12",
      "@types/node": "^22.0.0",
      "better-sqlite3": "^12.10.0",
      "cron-parser": "^5.5.0",
      hono: "^4.11.9",
      typescript: "^5.7.0",
      vitest: "^4.1.8",
      zod: "^4.3.6",
    },
  };
  const readme = `# ${options.name}

${options.description}

## Install

\`\`\`bash
rift plugin install "path:$PWD/plugins/${options.slug}" --yes
\`\`\`

## Use

${options.when ?? `Use ${options.name} when its focused capability is useful in rift.`}

## Develop

From the monorepo root:

\`\`\`bash
npm ci
npm run check --workspace=${packageName}
rift plugin install "path:$PWD/plugins/${options.slug}" --yes
\`\`\`
`;
  const server = `import type { RiftPluginApi } from "@riftlabs/plugin-sdk";

export default function plugin(rift: RiftPluginApi): void {
  rift.log.info(${loadedMessage});
}
`;
  const test = `import { createFakePluginHost } from "@riftlabs/plugin-sdk/testing";
import { describe, expect, it } from "vitest";

import plugin from "./server";

describe(${testName}, () => {
  it("loads through the rift plugin harness", async () => {
    const { rift, harness } = createFakePluginHost({ pluginId: "${options.slug}" });
    plugin(rift);
    expect(harness.inspection.logEntries.at(-1)?.message).toBe(${loadedMessage});
    await harness.lifecycle.dispose();
  });
});
`;
  const tsconfig = {
    compilerOptions: {
      target: "ES2022",
      lib: ["ES2022"],
      module: "ESNext",
      moduleResolution: "Bundler",
      strict: true,
      noEmit: true,
      skipLibCheck: true,
      types: ["node", "vitest/globals"],
    },
    include: ["*.ts"],
  };
  return {
    "package.json": `${JSON.stringify(manifest, null, 2)}\n`,
    "README.md": readme,
    "server.ts": server,
    "server.test.ts": test,
    "tsconfig.json": `${JSON.stringify(tsconfig, null, 2)}\n`,
  };
}

export async function scaffoldPlugin(rawOptions) {
  const options = {
    skipInstall: false,
    skipVerify: false,
    ...rawOptions,
  };
  validateOptions(options);
  const repositoryRoot = resolve(options.repositoryRoot ?? defaultRepositoryRoot);
  const directory = resolve(
    options.output ?? resolve(repositoryRoot, "plugins", options.slug),
  );
  await mkdir(directory);
  for (const [name, contents] of Object.entries(filesFor(options))) {
    await writeFile(resolve(directory, name), contents);
  }
  if (!options.skipInstall) command("npm", ["install"], repositoryRoot);
  if (!options.skipVerify) {
    command(
      "npm",
      ["run", "check", `--workspace=rift-plugin-${options.slug}`],
      repositoryRoot,
    );
  }
  return { directory, packageName: `rift-plugin-${options.slug}` };
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const result = await scaffoldPlugin(options);
  console.log(`created ${result.packageName} at ${result.directory}`);
}

if (resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  await main();
}
