# Teamtile

参加中のチームをタイルで表示することで素早くアクセスできます。

[![.github/workflows/trigger-on-main.yml](https://github.com/karamem0/teamtile/actions/workflows/trigger-on-main.yml/badge.svg)](https://github.com/karamem0/teamtile/actions/workflows/trigger-on-main.yml)
[![codecov](https://codecov.io/gh/karamem0/teamtile/graph/badge.svg?token=UY4ZU4E73I)](https://codecov.io/gh/karamem0/teamtile)
[![license](https://img.shields.io/github/license/karamem0/teamtile.svg)](https://github.com/karamem0/teamtile/blob/main/LICENSE)

## 機能

チームを探すのにイライラしていませんか? Teamtile は以下の機能を提供します😊

- 🧱参加中のチームをタイルで表示
- 📖チームのメンバーとチャンネルを表示
- 📁ファイル (SharePoint ドキュメント ライブラリ) へのナビゲーション
- 📅チャネル カレンダーへのナビゲーション
- 🪄チーム、チャネル、メンバーのフィルター
- 📌お気に入りのチームのピン留め

## スクリーンショット

### チーム

![screenshot1](./assets/screenshots/001.png)

### チャネル

![screenshot2](./assets/screenshots/002.png)

### メンバー

![screenshot3](./assets/screenshots/003.png)

### タグ

![screenshot4](./assets/screenshots/004.png)

## インストール

### Microsoft Entra ID アプリケーションの登録

1. [Azure ポータル](https://portal.azure.com) に移動します。

2. **≡** - **Microsoft Entra ID** をクリックします。

3. **アプリの登録** - **新規登録** をクリックします。

4. 情報を入力して **登録** をクリックします。

    |項目|値|
    |-|-|
    |名前|Teamtile|
    |サポートされているアカウントの種類|シングル テナント|

5.  **認証** をクリックしてプラットフォームを追加します。

    |項目|値|
    |-|-|
    |種類|シングル ページ アプリケーション|
    |リダイレクト URL|**Azure Web アプリの URL**/auth/callback|
    |アクセス トークン|チェックする|
    |ID トークン|チェックする|

6. **証明書とシークレット** をクリックしてシークレットを追加します。

7. **API のアクセス許可** をクリックしてアクセス許可を追加します。

    |API|アクセス許可|種類|
    |-|-|-|
    |Microsoft Graph|Channel.ReadBasic.All|委任されたアクセス許可|
    ||Group.Read.All|委任されたアクセス許可|
    ||Team.ReadBasic.All|委任されたアクセス許可|
    ||TeamMember.Read.All|委任されたアクセス許可|
    ||TeamworkTag.Read|委任されたアクセス許可|
    ||User.Read|委任されたアクセス許可|
    ||User.ReadBasic.All|委任されたアクセス許可|

8. **API の公開** をクリックしてスコープとクライアント アプリケーションを追加します。

    **スコープ**

    |項目|値|
    |-|-|
    |アプリケーション ID URL|api://**Azure Web アプリ のドメイン名**/**アプリケーション ID**|
    |スコープ名|user_impersonation|
    |同意できるユーザー|管理者とユーザー|
    |管理者の同意の表示名|Teamtile へのアクセス|
    |管理者の同意の説明|サインインしたユーザーの代わりに Teamtile にアクセスすることをアプリケーションに許可します。|
    |ユーザーの同意の表示名|Teamtile へのアクセス|
    |ユーザーの同意の説明|サインインしたユーザーの代わりに Teamtile にアクセスすることをアプリケーションに許可します。|
    |状態|有効|

    **クライアント アプリケーション**

    |アプリケーション|スコープ|
    |-|-|
    |1fec8e78-bce4-4aaf-ab1b-5451cc387264|user_impersonation|
    |5e3ce6c0-2b1f-4285-8d4b-75ee78787346|user_impersonation|

### Azure リソースの作成

1. Azure CLI でリソースをデプロイします。

```
az deployment group create --template-file ./bicep/main.bicep --resource-group <リソース グループ名> --parameters name=<アプリケーション名> microsoftAppId=<アプリケーション ID> microsoftAppPassword=<アプリケーション シークレット> microsoftAppTenantId=<テナント ID>
```

### アプリケーションのビルド

#### アプリケーション

1. `source/client` フォルダーに移動します。

2. `.env` ファイルを編集します。

    |プレースホルダー|置換|
    |-|-|
    |`{{MICROSOFT_APP_ID}}`|**アプリケーション ID**|
    |`{{MICROSOFT_TENANT_ID}}`|**テナント ID**|
    |`{{TELEMETRY_CONNECTION_STRING}}`|**Application Insights の接続文字列**|

3. アプリケーションをビルドします。

```
dotnet publish --configuration Release
```

4. `publish` フォルダーの中身を圧縮します。

```
Compress-Archive -Path ./bin/Release/net10.0/publish/* -DestinationPath ../../build.zip
```

### マニフェスト

1. `manifest` フォルダーに移動します。

2. `manifest.json` ファイルを編集します。

    |プレースホルダー|置換|
    |-|-|
    |`{{AZURE_WEB_APP_DOMAIN_NAME}}`|**Azure Web アプリのドメイン名**|
    |`{{MICROSOFT_APP_ID}}`|**アプリケーション ID**|

3. `manifest` フォルダーの中身を圧縮します。

```
Compress-Archive -Path ./* -DestinationPath ../manifest.zip
```

## アプリケーションのデプロイ

### Azure Web アプリ

1. [Azure ポータル](https://portal.azure.com) に移動します。

2. **≡** - **すべてのリソース** - **`Azure Web アプリ`** をクリックします。

3. **高度なツール** - **移動** をクリックします。

4. **デバッグ コンソール** - **PowerShell** をクリックします。

5. `site\wwwroot` フォルダーに移動します。

6. `build.zip` ファイルをアップロードします (ブラウザーにドラッグ & ドロップします)。

### Microsoft Teams アプリ

1. [Microsoft Teams 管理センター](https://admin.teams.microsoft.com/) に移動します。

2. **Teams のアプリ** - **アプリを管理** をクリックします。

3. **アップロード** をクリックして `manifest.zip` を選択します。

# 素材

アプリで使用している素材は [unDraw](https://undraw.co/illustrations) にライセンスされています。
