// Builds labelled contact-sheet montages of public/moto/_raw/*.jpg so the
// images can be reviewed in bulk. Output: scripts/_sheets/sheet_NN.png
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const RAW = "C:/Users/marko/misirli-promet/public/moto/_raw";
const OUT = "C:/Users/marko/misirli-promet/scripts/_sheets";
fs.mkdirSync(OUT, { recursive: true });

const files = fs
  .readdirSync(RAW)
  .filter((f) => /\.jpe?g$/i.test(f))
  .sort();

const COLS = 5;
const ROWS = 5;
const PER = COLS * ROWS;
const CELL = 260; // thumb cell width
const TH = 200; // thumb max height
const LABEL = 22;
const CELL_H = TH + LABEL;

(async () => {
  const sheets = Math.ceil(files.length / PER);
  for (let s = 0; s < sheets; s++) {
    const batch = files.slice(s * PER, s * PER + PER);
    const W = COLS * CELL;
    const H = ROWS * CELL_H;
    const composites = [];
    for (let i = 0; i < batch.length; i++) {
      const f = batch[i];
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const x = col * CELL;
      const y = row * CELL_H;
      const buf = await sharp(path.join(RAW, f))
        .resize(CELL - 8, TH - 8, { fit: "inside", background: "#222" })
        .toBuffer();
      composites.push({ input: buf, left: x + 4, top: y + LABEL });
      // label text as SVG
      const label = f.replace(/\.jpe?g$/i, "");
      const svg = Buffer.from(
        `<svg width="${CELL}" height="${LABEL}"><rect width="100%" height="100%" fill="#000"/><text x="6" y="16" font-family="monospace" font-size="15" fill="#fff">${label}</text></svg>`
      );
      composites.push({ input: svg, left: x, top: y });
    }
    const out = path.join(OUT, `sheet_${String(s + 1).padStart(2, "0")}.png`);
    await sharp({
      create: { width: W, height: H, channels: 3, background: "#111" },
    })
      .composite(composites)
      .png()
      .toFile(out);
    console.log("wrote", out, `(${batch.length} imgs)`);
  }
  console.log("TOTAL files:", files.length, "sheets:", sheets);
})();
