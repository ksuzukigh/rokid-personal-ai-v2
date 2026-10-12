import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// INTRODUCTION is the complete reader-facing source. Detailed documents keep
// their own relative links and are never concatenated into this README.
const introduction = await readFile(path.join(root, 'INTRODUCTION.md'), 'utf8');
await writeFile(path.join(root, 'README.md'), introduction.trim() + '\n');
console.log('Built the five-chapter GitHub README from INTRODUCTION.md.');
