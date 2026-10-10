# 閲覧用ページの更新

公開資料の正本はルートのINTRODUCTION・CHANGELOGと`docs/`のMarkdownです。READMEとHTMLは生成物なので、直接編集しません。

Node.js 20以降で次を実行します。

```sh
npm ci --ignore-scripts
npm run build:docs
```

生成されたHTMLと、元のMarkdownの差分を確認して同時にコミットします。GitHub Pagesは`main`の`/docs`を公開します。`.nojekyll`により、HTMLをそのまま配信します。独自ドメイン、外部フォント、広告、アクセス解析、ブラウザー側のJavaScriptは使いません。

`build-github-readme.mjs`は紹介と各文書をREADMEへ収録し、説明リンクをGitHubのページ内リンクへ変換します。生成されたREADMEも同時にコミットします。GitHubトップで各本文を読めることを、実際のブラウザーで確認します。

`build-reader.mjs`は既存の補助用HTMLを更新します。画像は既存の構成SVGを使用します。本文の正本は共通で、GitHubから別サイトへ誘導することを必須にしません。
