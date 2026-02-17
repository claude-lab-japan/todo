# TODO アプリケーション

React + TypeScript で構築されたモダンなTODOアプリケーションです。

## デプロイ先

- **Vercel**: https://todo-brown-one-50.vercel.app
- **GitHub Pages**: https://claude-lab-japan.github.io/todo/

## 機能

✅ **基本的なCRUD操作**
- タスクの追加・表示・編集・削除

✅ **完了状態の管理**
- チェックボックスでタスクの完了/未完了を切り替え

✅ **優先度設定**
- 高・中・低の3段階の優先度設定
- 優先度別の色分け表示

✅ **期限設定**
- 各タスクに期限を設定可能
- 期限切れの視覚的な表示

✅ **フィルタリング**
- すべて/未完了/完了でタスクをフィルタリング

✅ **データ永続化**
- ローカルストレージにデータを保存
- ページリロード後もデータを保持

## 技術スタック

- **React 18** - UIフレームワーク
- **TypeScript** - 型安全性
- **Vite** - 高速ビルドツール
- **CSS Modules** - スタイリング
- **uuid** - ユニークID生成
- **localStorage** - データ永続化

## セットアップ

### 必要要件

- Node.js 18以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:5173/ を開いてアプリケーションにアクセスできます。

### ビルド

```bash
npm run build
```

本番用のビルドは `dist` ディレクトリに生成されます。

### プレビュー

```bash
npm run preview
```

## 使い方

### タスクの追加

1. 「新しいタスクを追加...」フィールドをクリック
2. タスク名を入力（必須）
3. オプションで説明、優先度、期限を設定
4. 「追加」ボタンをクリック

### タスクの編集

1. タスクの「編集」ボタンをクリック
2. 内容を変更
3. 「保存」ボタンをクリック

### タスクの完了

- タスクの左側のチェックボックスをクリック

### タスクの削除

- タスクの「削除」ボタンをクリック

### フィルタリング

- 上部のタブで「すべて」「未完了」「完了」を切り替え

## プロジェクト構造

```
src/
├── components/
│   ├── TodoForm.tsx      # タスク追加フォーム
│   ├── TodoItem.tsx      # 個別タスク表示
│   ├── TodoList.tsx      # タスクリスト
│   └── TodoFilter.tsx    # フィルタータブ
├── hooks/
│   ├── useTodos.ts       # Todo状態管理
│   └── useLocalStorage.ts # ローカルストレージ永続化
├── types/
│   └── todo.ts           # TypeScript型定義
├── App.tsx               # メインアプリケーション
└── main.tsx              # エントリーポイント
```

## データ構造

```typescript
interface Todo {
  id: string;              // UUID
  title: string;           // タスク名
  description?: string;    // 説明
  completed: boolean;      // 完了状態
  priority: 'high' | 'medium' | 'low';  // 優先度
  dueDate: string | null;  // 期限
  createdAt: string;       // 作成日時
  updatedAt: string;       // 更新日時
}
```

## 今後の拡張案

- [ ] ダークモード対応
- [ ] ドラッグ&ドロップでソート
- [ ] カテゴリー/タグ機能
- [ ] 検索機能
- [ ] JSONエクスポート/インポート
- [ ] バックエンドAPI連携

## ライセンス

MIT
