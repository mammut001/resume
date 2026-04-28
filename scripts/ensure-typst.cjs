const fs = require("node:fs");
const fsp = require("node:fs/promises");
const https = require("node:https");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const TYPST_VERSION = process.env.TYPST_VERSION || "0.14.0";
const CACHE_ROOT = path.join(__dirname, "..", ".tools", "typst", TYPST_VERSION);

const targetMap = {
  darwin: {
    arm64: "aarch64-apple-darwin",
    x64: "x86_64-apple-darwin",
  },
  linux: {
    arm64: "aarch64-unknown-linux-musl",
    x64: "x86_64-unknown-linux-musl",
  },
};

const resolveSystemTypst = () => {
  try {
    return execFileSync("which", ["typst"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return null;
  }
};

const getTargetTriple = () => {
  const platformTargets = targetMap[process.platform];

  if (!platformTargets) {
    throw new Error(`Unsupported platform for Typst bootstrap: ${process.platform}`);
  }

  const targetTriple = platformTargets[process.arch];

  if (!targetTriple) {
    throw new Error(`Unsupported architecture for Typst bootstrap: ${process.arch}`);
  }

  return targetTriple;
};

const downloadFile = async (url, destinationPath) => {
  await new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      if (
        response.statusCode &&
        response.statusCode >= 300 &&
        response.statusCode < 400 &&
        response.headers.location
      ) {
        response.resume();
        downloadFile(response.headers.location, destinationPath).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download Typst: ${response.statusCode} ${response.statusMessage || ""}`.trim()));
        response.resume();
        return;
      }

      const fileStream = fs.createWriteStream(destinationPath);
      response.pipe(fileStream);

      fileStream.on("finish", () => {
        fileStream.close(resolve);
      });

      fileStream.on("error", (error) => {
        fileStream.close(() => reject(error));
      });
    });

    request.on("error", reject);
  });
};

const findTypstBinary = (directoryPath) => {
  const entries = fs.readdirSync(directoryPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      const nestedPath = findTypstBinary(entryPath);

      if (nestedPath) {
        return nestedPath;
      }

      continue;
    }

    if (entry.isFile() && entry.name === "typst") {
      return entryPath;
    }
  }

  return null;
};

const ensureTypst = async () => {
  const systemTypst = resolveSystemTypst();

  if (systemTypst) {
    return systemTypst;
  }

  const targetTriple = getTargetTriple();
  const installRoot = path.join(CACHE_ROOT, targetTriple);
  const archivePath = path.join(installRoot, `typst-${targetTriple}.tar.xz`);
  const extractRoot = path.join(installRoot, "extract");
  const binaryPath = path.join(installRoot, "typst");

  if (fs.existsSync(binaryPath)) {
    return binaryPath;
  }

  await fsp.mkdir(installRoot, { recursive: true });

  if (!fs.existsSync(archivePath)) {
    const downloadUrl = `https://github.com/typst/typst/releases/download/v${TYPST_VERSION}/typst-${targetTriple}.tar.xz`;
    await downloadFile(downloadUrl, archivePath);
  }

  await fsp.rm(extractRoot, { recursive: true, force: true });
  await fsp.mkdir(extractRoot, { recursive: true });

  execFileSync("tar", ["-xJf", archivePath, "-C", extractRoot], { stdio: "inherit" });

  const extractedBinary = findTypstBinary(extractRoot);

  if (!extractedBinary) {
    throw new Error(`Unable to locate Typst binary after extracting ${archivePath}`);
  }

  await fsp.copyFile(extractedBinary, binaryPath);
  await fsp.chmod(binaryPath, 0o755);

  return binaryPath;
};

if (require.main === module) {
  ensureTypst()
    .then((binaryPath) => {
      process.stdout.write(`${binaryPath}${os.EOL}`);
    })
    .catch((error) => {
      console.error(error instanceof Error ? error.message : error);
      process.exit(1);
    });
}

module.exports = {
  ensureTypst,
};