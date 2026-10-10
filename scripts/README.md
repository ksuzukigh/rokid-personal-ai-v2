# 閲覧用ページの更新

公開資料の正本はルートのREADME・CHANGELOGと`docs/`のMarkdownです。HTMLは生成物なので、直接編集しません。

Node.js 20以降で次を実行します。

```sh
npm ci --ignore-scripts
npm run build:reader
```

生成されたHTMLと、元のMarkdownの差分を確認して同時にコミットします。GitHub Pagesは`main`の`/docs`を公開します。`.nojekyll`により、HTMLをそのまま配信します。独自ドメイン、外部フォント、広告、アクセス解析、ブラウザー側のJavaScriptは使いません。

`build-reader.mjs`は公開資料だけを入力とし、Markdownの文書リンクを対応するHTMLへ変換します。画像は既存の構成SVGを使用します。新しいページを追加する場合は同スクリプトの`pages`へ登録し、文書間リンクと狭い画面での本文表示を確認してください。
