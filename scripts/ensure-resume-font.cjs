const fs = require("node:fs/promises");
const path = require("node:path");
const { createHash } = require("node:crypto");

const FONT_SHA256 = "2c76254f6fc379fddfce0a7e84fb5385bb135d3e399294f6eeb6680d0365b74b";
const FONT_URL = "https://raw.githubusercontent.com/notofonts/noto-cjk/f8d157532fbfaeda587e826d4cd5b21a49186f7c/Sans/OTF/SimplifiedChinese/NotoSansCJKsc-Regular.otf";
const FONT_DIR = path.join(__dirname, "..", ".tools", "resume-fonts");
const FONT_PATH = path.join(FONT_DIR, "NotoSansCJKsc-Regular.otf");
const validFont = (bytes) => createHash("sha256").update(bytes).digest("hex") === FONT_SHA256;

const ensureResumeFont = async () => {
  try {
    if (validFont(await fs.readFile(FONT_PATH))) return FONT_DIR;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  const response = await fetch(FONT_URL, { signal: AbortSignal.timeout(60000) });
  if (!response.ok) throw new Error(`Failed to download resume font: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (!validFont(bytes)) throw new Error("Resume font checksum mismatch");
  await fs.mkdir(FONT_DIR, { recursive: true });
  const temporaryPath = `${FONT_PATH}.${process.pid}.tmp`;
  await fs.writeFile(temporaryPath, bytes);
  await fs.rename(temporaryPath, FONT_PATH);
  return FONT_DIR;
};

module.exports = { ensureResumeFont };
