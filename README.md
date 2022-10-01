# WEB OTP Credential API Sample

このプロジェクトは WEB OTP Credential API のサンプルのためのプロジェクトです。

## 環境構築

```bash
$ node -v
v16.17.1

$ yarn

# 開発サーバーを立ち上げる
$ yarn dev
```

node のバージョン管理については volta を使っているので、volta のインストールを推奨します。  
[volta installation](https://docs.volta.sh/guide/getting-started)

## script（WIP）

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
