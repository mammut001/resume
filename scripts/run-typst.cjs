const { spawnSync } = require("node:child_process");
const { ensureTypst } = require("./ensure-typst.cjs");
const { ensureResumeFont } = require("./ensure-resume-font.cjs");

const main = async () => {
  const typstBinary = await ensureTypst();
  const args = process.argv.slice(2);
  // Use the same checksum-verified CJK font on local and hosted builds.
  if (args[0] === "compile") {
    args.push("--font-path", await ensureResumeFont());
  }
  const result = spawnSync(typstBinary, args, { stdio: "inherit" });

  if (result.error) {
    throw result.error;
  }

  process.exit(result.status ?? 1);
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
