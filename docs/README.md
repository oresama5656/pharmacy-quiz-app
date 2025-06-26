# ドキュメント目次

## 📋 開発関連

### 基本ガイド
- [開発ガイド](./開発ガイド.md) - プロジェクト構成と開発手順
- [バージョン管理ガイド](./バージョン管理ガイド.md) - バージョン管理のルールと手順

### 機能追加
- [カテゴリ追加手順書](./カテゴリ追加手順書.md) - 新しいクイズカテゴリの追加方法
- [カテゴリ追加チェックリスト](./カテゴリ追加チェックリスト.md) - 追加時の確認項目

## 🧪 テスト関連
- [TWAテストチェックリスト](./TWAテストチェックリスト.md) - Android版のテスト項目

## 📝 その他
- [メモ](./メモ.md) - 開発中のメモや備忘録

## 🚀 クイックスタート

### 開発環境構築
```bash
npm install
npm run dev
```

### バージョンアップ
```bash
npm version patch  # バグ修正
npm version minor  # 機能追加
npm version major  # 破壊的変更
```

### Android版ビルド
```bash
npm run build
./gradlew bundleRelease
jarsigner -keystore android.keystore app-release-bundle.aab android
```

## 📊 現在のバージョン
- **Web**: v20.0.0
- **Android**: versionCode 20, versionName "20.0.0"
- **Service Worker**: v2000 (自動生成) 