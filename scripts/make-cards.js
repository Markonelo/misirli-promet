// Renders a given list of _raw images large (2x2 per sheet) so promo-card text
// is legible. Usage: node make-cards.js 2 44 45 ...
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const RAW = "C:/Users/marko/misirli-promet/public/moto/_raw";
const OUT = "C:/Users/marko/misirli-promet/scripts/_cards";
fs.mkdirSync(OUT, { recursive: true });

const nums = process.argv.slice(2).map((n) => parseInt(n, 10));
const files = nums.map((n) => `mp_${String(n).padStart(3, "0")}.jpg`);

const COLS = 2;
const ROWS = 2;
const PER = COLS * ROWS;
const CELL = 600;
const TH = 600;
const LABEL = 26;
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
      const p = path.join(RAW, f);
      if (!fs.existsSync(p)) continue;
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const x = col * CELL;
      const y = row * CELL_H;
      const buf = await sharp(p)
        .resize(CELL - 8, TH - 8, { fit: "inside", background: "#222" })
        .toBuffer();
      composites.push({ input: buf, left: x + 4, top: y + LABEL });
      const label = f.replace(/\.jpe?g$/i, "");
      const svg = Buffer.from(
        `<svg width="${CELL}" height="${LABEL}"><rect width="100%" height="100%" fill="#000"/><text x="8" y="20" font-family="monospace" font-size="20" fill="#0f0">${label}</text></svg>`
      );
      composites.push({ input: svg, left: x, top: y });
    }
    const out = path.join(OUT, `card_${String(s + 1).padStart(2, "0")}.png`);
    await sharp({
      create: { width: W, height: H, channels: 3, background: "#111" },
    })
      .composite(composites)
      .png()
      .toFile(out);
    console.log("wrote", out);
  }
})();
