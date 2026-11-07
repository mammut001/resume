const { spawnSync } = require("node:child_process");
const { ensureTypst } = require("./ensure-typst.cjs");
const { ensureResumeFont } = require("./ensure-resume-font.cjs");

const main = async () => {
  const typstBinary = await ensureTypst();
  const args = process.argv.slice(2);
  // Use the same checksum-verified CJK font on local and hosted builds.
  if (args[0] === "compile") {
    args.push("--font-path", await ensureResumeFont());
    // Pin the document timestamp so repeated builds of identical content are
    // byte-for-byte reproducible instead of producing spurious PDF diffs.
    if (!args.some((arg) => arg.startsWith("--creation-timestamp"))) {
      args.push("--creation-timestamp", process.env.SOURCE_DATE_EPOCH ?? "1735689600");
    }
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
