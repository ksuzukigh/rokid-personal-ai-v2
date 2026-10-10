import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked, Renderer } from 'marked';

// The Markdown remains the source. Generated HTML contains only public docs.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docs = path.join(root, 'docs');
const base = '/rokid-personal-ai-v2/';
const github = 'https://github.com/ksuzukigh/rokid-personal-ai-v2';
const pages = [
  ['README.md', 'index.html', '私のAI V2'],
  ['docs/CONCEPT.md', 'CONCEPT.html', 'コンセプトと設計の理由'],
  ['docs/EXPERIENCE.md', 'EXPERIENCE.html', '会話と操作の例'],
  ['docs/ARCHITECTURE.md', 'ARCHITECTURE.html', 'システム構成'],
  ['docs/V1_AND_V2.md', 'V1_AND_V2.html', 'V1とV2の関係'],
  ['docs/BUILD_GUIDE.md', 'BUILD_GUIDE.html', '再現の手引き'],
  ['docs/REFERENCE_SPEC.md', 'REFERENCE_SPEC.html', '要求仕様とデータ例'],
  ['docs/AI_BUILD_PROMPT.md', 'AI_BUILD_PROMPT.html', 'AIと一緒に作るための開発依頼'],
  ['docs/SAFETY.md', 'SAFETY.html', '認証・録音・実行確認の設計'],
  ['docs/VALIDATION.md', 'VALIDATION.html', '実機確認の範囲と制約'],
  ['docs/REFERENCES.md', 'REFERENCES.html', '参照資料'],
  ['CHANGELOG.md', 'CHANGELOG.html', '変更履歴'],
];
const outputs = new Map(pages.map(([source, output]) => [path.join(root, source), output]));
const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function convertHref(href, source) {
  const readerOrigin = 'https://ksuzukigh.github.io' + base;
  if (href.startsWith(readerOrigin)) return base + href.slice(readerOrigin.length);
  if (/^(https?:|mailto:|#)/.test(href)) return href;
  const [name, fragment] = href.split('#');
  const resolved = path.resolve(root, path.dirname(source), name);
  const result = outputs.get(resolved);
  if (result) return base + result + (fragment ? '#' + fragment : '');
  if (resolved === path.join(root, 'LICENSE')) return github + '/blob/main/LICENSE';
  const relative = path.relative(docs, resolved);
  if (!relative.startsWith('..') && !path.isAbsolute(relative)) return base + relative.replaceAll(path.sep, '/');
  throw new Error(`Unmapped link in ${source}: ${href}`);
}
function navigation(output) {
  return pages.slice(1, 11).map(([, name, title]) =>
    `<li><a href="${base + name}"${output === name ? ' aria-current="page"' : ''}>${escape(title)}</a></li>`).join('\n');
}
await mkdir(path.join(docs, 'assets'), { recursive: true });
for (const [source, output, title] of pages) {
  const used = new Map();
  class ReaderRenderer extends Renderer {
    link(token) {
      const href = convertHref(token.href, source);
      if (!/^(https?:|mailto:|\/|#)/.test(href)) throw new Error('Unsupported link protocol');
      return `<a href="${escape(href)}"${token.title ? ` title="${escape(token.title)}"` : ''}>${this.parser.parseInline(token.tokens)}</a>`;
    }
    image(token) {
      return `<img src="${escape(convertHref(token.href, source))}" alt="${escape(token.text)}" loading="lazy">`;
    }
    heading(token) {
      const text = token.text.replace(/<[^>]+>/g, '').replace(/[*_`]/g, '');
      const slug = text.toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s+/g, '-');
      const n = used.get(slug) ?? 0; used.set(slug, n + 1);
      return `<h${token.depth} id="${escape(slug + (n ? '-' + n : ''))}">${this.parser.parseInline(token.tokens)}</h${token.depth}>\n`;
    }
    table(token) { return `<div class="table-scroll" tabindex="0">${super.table(token)}</div>`; }
  }
  const markdown = (await readFile(path.join(root, source), 'utf8'))
    .replace(/^> \*\*本文を読む方へ\*\*.*\n\n/m, '');
  const body = new Marked({ gfm: true }).parse(markdown, { renderer: new ReaderRenderer() });
  const html = `<!doctype html>
<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(title)} | 私のAI V2</title><meta name="description" content="私のAI V2のコンセプト・設計・再現手引き。鈴木啓一の個人開発プロジェクト。">
<link rel="stylesheet" href="${base}assets/reader.css"></head>
<body><a class="skip" href="#content">本文へ</a><header><div class="header-inner">
<a class="brand" href="${base}">私のAI V2</a><nav aria-label="共通"><a href="${base}">トップ</a><a href="${github}">GitHub</a></nav>
</div></header><main id="content"><article>${body}</article>
<details class="pages"><summary>他の資料を読む</summary><nav aria-label="資料一覧"><ul>${navigation(output)}</ul></nav></details>
</main><footer>鈴木啓一 / Keiichi Suzuki · <a href="${github}/blob/main/${source}">この文書の元ファイル</a> · <a href="${github}/blob/main/LICENSE">MIT License</a></footer></body></html>\n`;
  await writeFile(path.join(docs, output), html);
}
await writeFile(path.join(docs, '.nojekyll'), '');
await writeFile(path.join(docs, '404.html'), `<!doctype html><html lang="ja"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>ページが見つかりません | 私のAI V2</title><link rel="stylesheet" href="${base}assets/reader.css"><main><h1>ページが見つかりません</h1><p><a href="${base}">私のAI V2のトップへ戻る</a></p></main></html>\n`);
const unexpected = (await readdir(docs)).filter(n => n.endsWith('.html') && !pages.some(p => p[1] === n) && n !== '404.html');
if (unexpected.length) throw new Error('Review unexpected generated pages: ' + unexpected.join(', '));
console.log(`Built ${pages.length} reading pages and a 404 page from the public Markdown.`);
