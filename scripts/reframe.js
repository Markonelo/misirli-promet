// Re-frames each public/moto/<slug>/1.jpg to a clean 4:3 canvas so nothing is
// cut off: the full image is `contain`-fitted (whole bike always visible) over a
// softly-blurred, darkened backdrop of itself (no flat letterbox bars).
// Originals are preserved as _orig.jpg, so this is safe and idempotent.
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/marko/misirli-promet/public/moto";
const TW = 1200; // 4:3 target
const TH = 900;
const PAD = 0.96; // foreground fills 96% of the frame

// Square-ish images already crop fine; skip low-res tekken (206x206 source).
const SKIP = new Set(["tekken"]);

const slugs = fs
  .readdirSync(ROOT)
  .filter((d) => d !== "_raw" && fs.existsSync(path.join(ROOT, d, "1.jpg")))
  .sort();

(async () => {
  for (const slug of slugs) {
    if (SKIP.has(slug)) {
      console.log("skip ", slug);
      continue;
    }
    const dir = path.join(ROOT, slug);
    const orig = path.join(dir, "_orig.jpg");
    const live = path.join(dir, "1.jpg");
    // Preserve the untouched original once.
    if (!fs.existsSync(orig)) fs.copyFileSync(live, orig);

    const bg = await sharp(orig)
      .resize(TW, TH, { fit: "cover", position: "centre" })
      .blur(28)
      .modulate({ brightness: 0.5, saturation: 0.9 })
      .toBuffer();

    const fg = await sharp(orig)
      .resize(Math.round(TW * PAD), Math.round(TH * PAD), { fit: "inside" })
      .toBuffer();
    const fgMeta = await sharp(fg).metadata();
    const left = Math.round((TW - fgMeta.width) / 2);
    const top = Math.round((TH - fgMeta.height) / 2);

    await sharp(bg)
      .composite([{ input: fg, left, top }])
      .jpeg({ quality: 90 })
      .toFile(live + ".tmp");
    fs.renameSync(live + ".tmp", live);
    console.log("done ", slug, `(fg ${fgMeta.width}x${fgMeta.height})`);
  }
})();
