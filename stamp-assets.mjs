// Adds a content hash to every stylesheet and script link (styles.css?v=1a2b3c4d)
// so browsers fetch the new file as soon as it changes, instead of pairing new
// pages with a cached old stylesheet. Run after editing CSS/JS:
//   node stamp-assets.mjs && node projects/build.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const ASSETS = ['styles.css', 'script.js', 'style-switch.js', 'shot-stack.js'];
const hash = (f) => createHash('sha256').update(readFileSync(new URL(f, import.meta.url))).digest('hex').slice(0, 8);
const versions = Object.fromEntries(ASSETS.map((f) => [f, hash(f)]));

for (const file of ['index.html', 'projects/build.mjs']) {
  const url = new URL(file, import.meta.url);
  let s = readFileSync(url, 'utf8');
  for (const [asset, v] of Object.entries(versions)) {
    const name = asset.replace('.', '\\.');
    s = s.replace(new RegExp(`((?:\\.\\./)?${name})(\\?v=[0-9a-f]+)?(")`, 'g'), `$1?v=${v}$3`);
  }
  writeFileSync(url, s);
}
console.log('stamped:', Object.entries(versions).map(([f, v]) => `${f}?v=${v}`).join('  '));
