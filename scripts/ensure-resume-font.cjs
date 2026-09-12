const fs = require("node:fs/promises");
const path = require("node:path");
const { createHash } = require("node:crypto");

const FONT_DIR = path.join(__dirname, "..", ".tools", "resume-fonts");
const FONT_SOURCES = [
  {
    filename: "NotoSans-Regular.ttf",
    sha256: "b85c38ecea8a7cfb39c24e395a4007474fa5a4fc864f6ee33309eb4948d232d5",
    url: "https://raw.githubusercontent.com/notofonts/noto-fonts/ffebf8c1ee449e544955a7e813c54f9b73848eac/hinted/ttf/NotoSans/NotoSans-Regular.ttf",
  },
  {
    filename: "NotoSans-Bold.ttf",
    sha256: "c976e4b1b99edc88775377fcc21692ca4bfa46b6d6ca6522bfda505b28ff9d6a",
    url: "https://raw.githubusercontent.com/notofonts/noto-fonts/ffebf8c1ee449e544955a7e813c54f9b73848eac/hinted/ttf/NotoSans/NotoSans-Bold.ttf",
  },
  {
    filename: "NotoSans-Italic.ttf",
    sha256: "36cff144df01309dab648bea71baff9bb074026914afe63aeacc8bc90b67a28b",
    url: "https://raw.githubusercontent.com/notofonts/noto-fonts/ffebf8c1ee449e544955a7e813c54f9b73848eac/hinted/ttf/NotoSans/NotoSans-Italic.ttf",
  },
  {
    filename: "NotoSans-BoldItalic.ttf",
    sha256: "6edf4227ef0fa846aca70e86a307804ca4401741830f5b3af0f2554abe2b8466",
    url: "https://raw.githubusercontent.com/notofonts/noto-fonts/ffebf8c1ee449e544955a7e813c54f9b73848eac/hinted/ttf/NotoSans/NotoSans-BoldItalic.ttf",
  },
  {
    filename: "NotoSansCJKsc-Regular.otf",
    sha256: "2c76254f6fc379fddfce0a7e84fb5385bb135d3e399294f6eeb6680d0365b74b",
    url: "https://raw.githubusercontent.com/notofonts/noto-cjk/f8d157532fbfaeda587e826d4cd5b21a49186f7c/Sans/OTF/SimplifiedChinese/NotoSansCJKsc-Regular.otf",
  },
];

const validFont = (bytes, sha256) =>
  createHash("sha256").update(bytes).digest("hex") === sha256;

const ensureFont = async ({ filename, sha256, url }) => {
  const fontPath = path.join(FONT_DIR, filename);

  try {
    if (validFont(await fs.readFile(fontPath), sha256)) return;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
  if (!response.ok) throw new Error(`Failed to download ${filename}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (!validFont(bytes, sha256)) throw new Error(`${filename} checksum mismatch`);
  const temporaryPath = `${fontPath}.${process.pid}.tmp`;
  await fs.writeFile(temporaryPath, bytes);
  await fs.rename(temporaryPath, fontPath);
};

const ensureResumeFont = async () => {
  await fs.mkdir(FONT_DIR, { recursive: true });
  await Promise.all(FONT_SOURCES.map(ensureFont));
  return FONT_DIR;
};

module.exports = { ensureResumeFont };
