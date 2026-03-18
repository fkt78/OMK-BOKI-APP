# 簿記3級 学習アプリ

日商簿記3級合格を目指す学習アプリです。React + PWA で構築し、オフラインでも学習できます。

## 機能

### 実装済み
- **仕訳練習** - 第1問対策。86パターン × 金額バリエーションで **2,000問以上** の出題が可能
- **繰り返し学習** - 15問セットでランダム出題。何度でも新しい問題に挑戦可能
- **学習進捗** - 累計の正解数・正答率をローカルに保存
- **PWA対応** - オフライン利用可能、ホーム画面に追加してアプリのように利用可能

### 準備中
- 勘定科目の学習
- 精算表・試算表の練習
- 決算整理の練習

## 技術スタック

- React 19 + TypeScript
- Vite 8
- React Router
- vite-plugin-pwa（PWA対応）

## 開発

```bash
# 依存関係のインストール
npm install --legacy-peer-deps

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# ビルドのプレビュー
npm run preview
```

## バージョン管理

バージョン番号はメイン画面のフッターに表示されます。コード変更時にバージョンを更新するには：

```bash
npm run version:patch   # 1.0.0 → 1.0.1（軽微な修正）
npm run version:minor   # 1.0.0 → 1.1.0（新機能追加）
npm run version:major   # 1.0.0 → 2.0.0（大きな変更）
```

## 問題の追加

`src/data/journalEntries.ts` に仕訳テンプレートを追加することで、問題数を増やせます。

```typescript
{
  id: 'unique-id',
  question: '取引内容￥{amount}を...',  // {amount} が金額に置換
  debit: '借方勘定科目',
  credit: '貸方勘定科目',
  explanation: '解説文',
  category: 'カテゴリ名'
}
```

## ライセンス

MIT
