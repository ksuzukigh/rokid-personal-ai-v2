# 参照資料

2026年10月10日に参照先を確認しました。製品や開発環境は変わるため、再現時は現在の仕様と自分の環境で読み直してください。

## RokidとYodaOS

- [AIUIの公開資料](https://github.com/yodaos-project/AIUI) — Agent、実行環境、APIを調べる出発点。
- [AIUIの端末保存API](https://github.com/yodaos-project/AIUI/blob/main/documentation/3-api/storage-api.en-US.md) — Agentごとの保存。安全な鍵保管庫の保証とは区別する。
- [AIUIのwx互換API](https://github.com/yodaos-project/AIUI/blob/main/skills/aiui-dev/references/apis/wx.md) — 自分のAgent環境で使えるAPIと条件を確認する。

公開APIの存在だけでは、RV101の自作Agentでの録音・入力・表示・保存・終了の合格を意味しません。YodaOSの実機で確認します。

## Codex

- [Codex App Server](https://learn.chatgpt.com/docs/app-server) — 会話とターン、初期化、イベント、承認などの公式資料。
- [Codexをプラットフォームとして使う考え方](https://developers.openai.com/blog/codex-as-a-platform) — SDKやApp Serverなど接続方法の役割。

独立したApp Serverクライアントと、個人用V2の既存デスクトップ会話のキュー経路を同じ仕様として扱わないようにします。利用モデル・ログイン・利用枠・権限も自分の環境で確認します。

## 通信と文字起こし

- [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) — Macから外向きに接続を張る通信経路。
- [whisper.cpp](https://github.com/ggml-org/whisper.cpp) — Mac内の文字起こしに用いる実装の一例。
- [Silero VAD](https://github.com/snakers4/silero-vad) — 発話区間の検出。

通信のトンネルとアプリ利用者の認証は別です。文字起こしとVADも、話者分離や同意の判断の代わりにはなりません。

## V1

- [私のAI V1の参考公開](https://github.com/ksuzukigh/rokid-personal-ai) — V2に至る前段階の設計と参考コード。

V1のコードや過去の制限を、V2の現行実装として読み替えないでください。

個人用V2の仕様と実機確認は作者の記録によります。公式資料へのリンクは部品の説明を支えるもので、この個人プロジェクトの公式承認や、完成品の提供を示すものではありません。

[トップへ](../README.md)
