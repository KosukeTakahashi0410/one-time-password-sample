# WEB OTP Credential API Sample

このプロジェクトは WEB OTP Credential API のサンプルのためのプロジェクトです。  
Vercel でホスティングされています。  
[開発環境](https://one-time-password-sample.vercel.app/otp/request)

## 環境構築

```bash
$ node -v
v16.17.1

# 依存パッケージをインストール
$ yarn

# 開発サーバーを立ち上げる
$ yarn dev
```

node のバージョン管理については volta を使っているので、volta のインストールを推奨します。  
[volta installation](https://docs.volta.sh/guide/getting-started)

## scripts

```bash
# 開発サーバーの立ち上げ、URLパスの生成
$ yarn dev

# 開発サーバーの立ち上げ
$ yarn dev:next

# URLパスの生成
$ yarn dev:path

# lint
$ yarn lint

# lint fix
$ lint:fix
```

## Tips

pathpida を使っているので、URL は `src/lib/$path` からパスを使うようにしてください。  
パスは開発サーバーを立ち上げると自動で生成されます。

## Vercel の環境変数について

Vercel については @KosukeTakahashi0410 が管理しています  
こちらは Hobby プランだと Team が追加されないためです。  
環境変数を追加する場合は @KosukeTakahashi0410 に連絡ください。
