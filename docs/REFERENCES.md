# 参照資料

「私のAI」の考え方を理解するために、以下の技術資料を全部読む必要はありません。似た仕組みを作るときに、開発を手伝うAIや技術に詳しい人が部品の機能を確かめるための資料です。

参照先は2026年10月10日に確認しました。製品や開発環境は変わるため、実装時には最新の資料と自分の環境を確認してください。

## ChatGPT Workやプロジェクトを知りたい方へ

- [ChatGPT Workの紹介](https://learn.chatgpt.com/docs/get-started-with-work)：調査や文書・スライドなどの作成を進めてもらう使い方。
- [プロジェクトとチャット](https://learn.chatgpt.com/docs/projects?surface=app)：関連するチャット、資料、指示をまとめる考え方。

この資料では、一続きのやり取りを「チャット」と呼びます。「スレッド」も、そのやり取りのまとまりを指す呼び方として説明しています。作者が利用するのは、MacのChatGPTデスクトップアプリにあるChatGPT Workです。

## V1を知りたい方へ

[私のAI V1の参考公開](https://github.com/ksuzukigh/rokid-personal-ai)では、最初の仕組みと参考コードを残しています。V1の操作手順や制限は当時のもので、V2の現在の使い方とは区別してください。

<details>
<summary>開発を担当する方へ：部品の公式資料を開く</summary>

### 眼鏡の録音・表示・保存を扱う

RokidのRV101では、YodaOSという眼鏡のOS上で、AIUI Agentという仕組みを使っています。Agentは、このプロジェクトでは眼鏡の録音や表示を担当する部分です。

- [AIUIの公開資料](https://github.com/yodaos-project/AIUI)：Agentの実行環境や、プログラムから使える機能を調べる出発点。
- [AIUIの端末保存API](https://github.com/yodaos-project/AIUI/blob/main/documentation/3-api/storage-api.en-US.md)：Agentごとにデータを保存する機能。認証情報を安全に保管できる保証とは別に評価する。
- [AIUIのwx互換API](https://github.com/yodaos-project/AIUI/blob/main/skills/aiui-dev/references/apis/wx.md)：自作Agentの環境で使える機能と条件を確認する。

APIは、プログラム同士が機能を呼び出すための窓口です。公開資料に機能があっても、自作Agentで録音・表示・終了まで動くかは、RV101で確かめます。

### ChatGPT Workのチャットへつなぐ実装を調べる

以下のCodexという名称は、内部の接続部について参照する公式資料の名前です。利用者が普段開くアプリと作業画面は、ChatGPTデスクトップアプリとChatGPT Workとして説明します。

- [Codex App Server](https://learn.chatgpt.com/docs/app-server)：チャットを作成・再開し、入力を送り、進捗や結果を受け取る仕組み。
- [Codexをプラットフォームとして使う考え方](https://developers.openai.com/blog/codex-as-a-platform)：プログラムからCodexを利用する方法と、その役割。

独立したテストチャットへの接続と、作者のV2が使う既存デスクトップチャットへの接続は、同じ呼び出し仕様とは扱いません。[詳しい仕様](REFERENCE_SPEC.md)の接続条件も確認してください。

### 通信と文字起こしを扱う

- [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/)：外出先からMacへ通信を届ける経路。本人確認は別に必要。
- [whisper.cpp](https://github.com/ggml-org/whisper.cpp)：音声を文字にするWhisperを、Mac内で動かすための実装例。
- [Silero VAD](https://github.com/snakers4/silero-vad)：人の声がある区間を見つける仕組み。周囲の声の完全な分離や、同意の判断をするものではない。

</details>

公式資料へのリンクは、部品を調べるためのものです。各社によるこの個人プロジェクトの公式承認や、完成した製品の提供を示すものではありません。

[トップへ](../README.md)
