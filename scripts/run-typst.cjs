const { spawnSync } = require("node:child_process");
const { ensureTypst } = require("./ensure-typst.cjs");

const main = async () => {
  const typstBinary = await ensureTypst();
  const result = spawnSync(typstBinary, process.argv.slice(2), { stdio: "inherit" });

  if (result.error) {
    throw result.error;
  }

  process.exit(result.status ?? 1);
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});