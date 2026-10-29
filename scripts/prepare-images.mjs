// Makes web-ready copies of every image in design/masters/ and writes them to public/images/.
// Masters are only ever read, never moved or changed. Safe to run as often as you like:
//   node scripts/prepare-images.mjs
//
// To add or replace an image, drop the full-size file into design/masters/ with the final name
// (any of .jpg/.jpeg/.png/.webp) and run the script again.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.join(import.meta.dirname, "..");
const masters = path.join(root, "design/masters");
const pub = path.join(root, "public/images");
fs.mkdirSync(pub, { recursive: true });

// Width of the web copy for each image. Anything not listed is treated as a product photo (1000px).
const widths = {
  "hero-baker": 1200,
  "birthday-pour-bg": 1900,
  "order-flatlay-pink": 1900,
};

// --white-choc from globals.css (#FBF3E6).
const WHITE_CHOC = [0xfb, 0xf3, 0xe6];

const out = (name) => path.join(pub, name);
const jpg = (img, width, name) =>
  img.resize({ width, withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toFile(out(name));

(async () => {
  const files = fs.readdirSync(masters).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));

  for (const file of files) {
    const name = path.parse(file).name;
    const src = path.join(masters, file);

    if (name.startsWith("cream-drips")) {
      // Transparent drip overlays: keep the alpha channel, tint the flat cream to the white-choc
      // token so it joins seamlessly with CSS-filled areas, and trim empty rows below the drips.
      const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      const at = (x, y, c) => data[(y * info.width + x) * 4 + c];
      const avg = [0, 1, 2].map((c) => {
        let sum = 0;
        for (let x = 0; x < info.width; x += 4) sum += at(x, 2, c);
        return sum / Math.ceil(info.width / 4);
      });
      const factors = WHITE_CHOC.map((t, c) => t / avg[c]);
      let lowest = 0;
      for (let y = info.height - 1; y >= 0 && !lowest; y--) {
        for (let x = 0; x < info.width; x += 2) if (at(x, y, 3) > 200) { lowest = y; break; }
      }
      await sharp(src)
        .ensureAlpha()
        .extract({ left: 0, top: 0, width: info.width, height: Math.min(info.height, lowest + 8) })
        .linear([...factors, 1.02], [0, 0, 0, 0])
        .resize({ width: 1800, withoutEnlargement: true })
        .webp({ quality: 82, alphaQuality: 90 })
        .toFile(out(`${name}.webp`));
    } else if (name === "events-full") {
      // One image holds both Special Events halves: split it down the middle.
      const { width, height } = await sharp(src).metadata();
      const half = Math.floor(width / 2);
      await jpg(sharp(src).extract({ left: 0, top: 0, width: half, height }), 1000, "events-flour-lettering.jpg");
      await jpg(sharp(src).extract({ left: half, top: 0, width: width - half, height }), 1000, "events-panel-bg.jpg");
    } else {
      await jpg(sharp(src), widths[name] ?? 1000, `${name}.jpg`);
    }

    // The Hero uses the birthday pour mirrored, so it flows from the top left.
    if (name === "birthday-pour-bg") {
      await jpg(sharp(src).flop(), 1900, "hero-pour-bg.jpg");
    }
  }

  for (const f of fs.readdirSync(pub).sort()) {
    const m = await sharp(out(f)).metadata();
    const kb = Math.round(fs.statSync(out(f)).size / 1024);
    console.log(f.padEnd(32), `${m.width}x${m.height}`.padEnd(11), `${kb} KB`, kb > 300 ? "  <-- over 300 KB" : "");
  }
})();
