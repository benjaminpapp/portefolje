// Skalerer bildene i src/assets/foto/ ned til noe et nettsted kan leve med.
// Rått kamerafil er 5-15 MB; galleriet viser dem som fliser og lightboxen
// trenger ikke mer enn ~1600 px. Kjøres med `npm run foto`.
//
// Skriver .webp og sletter originalen når konverteringen lyktes. Råfilene bør
// ligge utenfor repoet — "Bilder til portefølje/" er allerede gitignorert.
import { readdir, stat, unlink } from "node:fs/promises"
import { join, extname, basename } from "node:path"
import sharp from "sharp"

const DIR = "src/assets/foto"
const MAX_EDGE = 1600
const QUALITY = 82
const INPUT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".tif", ".tiff"])

// `npm run foto -- --from "WeTransfer"` leser råfilene fra en annen mappe og
// skriver de nedskalerte kopiene inn i galleriet. Uten flagget jobber den
// in-place på src/assets/foto/ og sletter originalen etter konvertering.
const fromArg = process.argv.indexOf("--from")
const SRC_DIR = fromArg > -1 ? process.argv[fromArg + 1] : DIR
const inPlace = SRC_DIR === DIR

const kb = (n) => `${Math.round(n / 1024)} KB`

const files = (await readdir(SRC_DIR)).filter((f) => INPUT.has(extname(f).toLowerCase()))

if (files.length === 0) {
  console.log(`Ingen bilder i ${SRC_DIR}/. Slipp filene dine inn der og kjør på nytt.`)
  process.exit(0)
}

let converted = 0
let savedBytes = 0

for (const file of files) {
  const src = join(SRC_DIR, file)
  const out = join(DIR, `${basename(file, extname(file))}.webp`)
  const before = (await stat(src)).size

  const image = sharp(src, { failOn: "error" }).rotate() // rotate() følger EXIF-orientering
  const { width, height } = await image.metadata()
  const longest = Math.max(width ?? 0, height ?? 0)

  // Allerede webp og innenfor målet? La den være — ingen grunn til å
  // rekomprimere og tape kvalitet for hver kjøring.
  if (src === out && longest <= MAX_EDGE) {
    console.log(`  hopper over  ${file} (${width}x${height}, ${kb(before)})`)
    continue
  }

  const buf = await image
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer()

  await sharp(buf).toFile(out)
  // Originalen slettes bare når vi jobber in-place. Leser vi fra en annen
  // mappe, er den mappa råarkivet og skal stå urørt.
  if (inPlace && src !== out) await unlink(src)

  const after = (await stat(out)).size
  savedBytes += before - after
  converted++
  console.log(`  ${file} → ${basename(out)}  ${kb(before)} → ${kb(after)}`)
}

console.log(
  converted === 0
    ? "Alt var allerede klart."
    : `\nFerdig: ${converted} bilde(r), ${kb(savedBytes)} spart.`
)
