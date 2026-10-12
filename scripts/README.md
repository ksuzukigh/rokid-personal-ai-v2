# 閲覧用ページの更新

公開資料の正本はルートのINTRODUCTION・CHANGELOGと`docs/`のMarkdownです。READMEとHTMLは生成物なので、直接編集しません。

Node.js 20以降で次を実行します。

```sh
npm ci --ignore-scripts
npm run build:docs
```

生成されたHTMLと、元のMarkdownの差分を確認して同時にコミットします。GitHub Pagesは`main`の`/docs`を公開します。`.nojekyll`により、HTMLをそのまま配信します。独自ドメイン、外部フォント、広告、アクセス解析、ブラウザー側のJavaScriptは使いません。

`build-github-readme.mjs`は`INTRODUCTION.md`だけからREADMEを生成します。INTRODUCTIONは一般向けの5章を持つ正本です。README内の目次はページ内リンク、詳しい資料は`docs/*.md`への相対リンクを使います。技術文書の全文は連結せず、資料リンクをページ内リンクへ変換しません。生成されたREADMEも同時にコミットします。

読者は一般事務職を基本とします。READMEは用途、操作、仕組み、必要な環境とデータ、確認済み範囲の5章です。利用場面・タップ操作・構成・外出通信の4図を使い、ほかの図は対応するdocsへ置きます。READMEに技術全文や折りたたみを戻しません。作る手引きの入口は`docs/BUILD_GUIDE.md`です。JSONや内部の接続方法は既存の技術文書で説明します。

`build-reader.mjs`は既存の補助用HTMLを更新します。画像は`docs/images/`の構成SVGと利用者向け図解PNGを使用します。図解の編集用原本は同名のSVGです。PNGを更新するときはSVGから描画し、日本語と960px・390px表示を確認します。本文の正本は共通で、GitHubから別サイトへ誘導することを必須にしません。

利用者向けの名称は「ChatGPTデスクトップアプリ」「ChatGPT Work」とします。内部技術の名称Codex App Serverを、利用アプリ名として混ぜません。アプリ内の継続するやり取りは「チャット」と呼び、プロジェクト・スレッドとの関係を説明します。眼鏡の録音の手順は「操作」だけで済ませず、「テンプルを1回タップ」「テンプルをもう1回タップ」と明記します。実際の画面ラベル「続ける会話」等は変更せず、チャットを指す表示だと説明します。
