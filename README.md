# クイストラ - 知識で挑むファンタジーRPG

薬学知識をクイズ形式で学習できるRPG風Webアプリケーションです。

## 🎮 特徴

- **RPG風UI**: ファンタジー世界観でクイズを楽しく学習
- **多様なカテゴリ**: 薬学、数学、英語、国語など幅広い分野
- **プログレッシブウェブアプリ**: オフラインでも動作
- **Android対応**: Google Playストアからダウンロード可能

## 🛠️ 技術スタック

- **フロントエンド**: React + TypeScript + Vite
- **スタイリング**: Tailwind CSS
- **アニメーション**: Framer Motion
- **Android**: Trusted Web Activity (TWA)
- **デプロイ**: Vercel (Web) + Google Play Console (Android)

## 🚀 開発環境構築

```bash
# リポジトリクローン
git clone [repository-url]
cd pharmacy-quiz-app

# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build
```

## 📚 ドキュメント

詳細な開発ドキュメントは[docsディレクトリ](./docs/)を参照してください：

- [開発ガイド](./docs/開発ガイド.md) - プロジェクト構成と開発手順
- [バージョン管理ガイド](./docs/バージョン管理ガイド.md) - バージョン管理のルールと手順
- [カテゴリ追加手順書](./docs/カテゴリ追加手順書.md) - 新しいクイズカテゴリの追加方法

## 📊 現在のバージョン

- **Web**: v20.0.0
- **Android**: versionCode 20, versionName "20.0.0"
- **Service Worker**: v2000 (自動生成)

## 🔧 バージョン管理

### Service Workerの自動化 ✅
- `package.json`のバージョンから自動生成
- 手動更新不要

### 手動更新が必要
- Android `versionCode` / `versionName` in `app/build.gradle`

### バージョンアップ手順
```bash
# 1. package.jsonを更新
npm version patch  # バグ修正
npm version minor  # 機能追加
npm version major  # 破壊的変更

# 2. Android側を手動更新 (app/build.gradle)
# versionCode: 21
# versionName: "20.1.0"

# 3. ビルド実行
npm run build
```

## 📱 Android版ビルド

```bash
# AABファイル生成
./gradlew bundleRelease

# 署名
jarsigner -keystore android.keystore app-release-bundle.aab android
```
