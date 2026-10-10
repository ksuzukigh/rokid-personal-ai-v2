import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sections = [
  'docs/EXPERIENCE.md', 'docs/CONCEPT.md', 'docs/V1_AND_V2.md',
  'docs/ARCHITECTURE.md', 'docs/SAFETY.md', 'docs/VALIDATION.md',
  'docs/BUILD_GUIDE.md', 'docs/AI_BUILD_PROMPT.md', 'docs/REFERENCE_SPEC.md',
  'docs/REFERENCES.md', 'CHANGELOG.md',
];
const optional = new Map([
  ['docs/BUILD_GUIDE.md', '作ってみたい方へ：目的の整理と作る順序を開く'],
  ['docs/AI_BUILD_PROMPT.md', '作ってみたい方へ：AIへの依頼文を開く'],
  ['CHANGELOG.md', '公開資料の変更履歴を開く'],
]);
const sources = new Map();
const anchors = new Map();
const slug = title => title.toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s+/g, '-');
for (const file of sections) {
  const markdown = await readFile(path.join(root, file), 'utf8');
  const title = markdown.match(/^# (.+)$/m)?.[1];
  if (!title) throw new Error('Missing document title: ' + file);
  sources.set(file, markdown);
  anchors.set(path.join(root, file), slug(title));
}
function rewriteLinks(markdown, file) {
  let fenced = false;
  return markdown.split('\n').map(line => {
    if (line.startsWith('```')) { fenced = !fenced; return line; }
    if (fenced) return line;
    return line.replace(/(\[[^\]]+\])\(([^)\s]+)\)/g, (match, label, href) => {
      if (/^(https?:|mailto:|#)/.test(href)) return match;
      const target = path.resolve(root, path.dirname(file), href);
      if (target === path.join(root, 'README.md')) return `${label}(#読みたいところから)`;
      if (anchors.has(target)) return `${label}(#${anchors.get(target)})`;
      const relative = path.relative(root, target);
      if (relative.startsWith('..') || path.isAbsolute(relative)) throw new Error('Link outside repository: ' + href);
      return `${label}(${relative.replaceAll(path.sep, '/')})`;
    });
  }).join('\n');
}
function demoteHeadings(markdown) {
  let fenced = false;
  return markdown.split('\n').map(line => {
    if (line.startsWith('```')) { fenced = !fenced; return line; }
    return fenced ? line : line.replace(/^(#{1,5}) /, '$1# ');
  }).join('\n');
}
const intro = rewriteLinks(await readFile(path.join(root, 'INTRODUCTION.md'), 'utf8'), 'INTRODUCTION.md');
const chapters = sections.map(file => {
  const markdown = demoteHeadings(rewriteLinks(sources.get(file), file)).trim();
  if (!optional.has(file)) return markdown;
  const [heading, ...body] = markdown.split('\n');
  // Keep linked chapter headings visible. Readers choose whether to open the contents.
  return `${heading}\n\n<details>\n<summary>${optional.get(file)}</summary>\n\n${body.join('\n').trim()}\n\n</details>`;
});
await writeFile(path.join(root, 'README.md'), `${intro.trim()}\n\n---\n\n${chapters.join('\n\n---\n\n')}\n`);
console.log(`Built GitHub README with ${chapters.length} full sections and in-page document links.`);
