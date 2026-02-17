export type Priority = 'high' | 'medium' | 'low';

export type FilterType = 'all' | 'active' | 'completed';

export interface Todo {
  id: string;              // UUID
  title: string;           // タスクタイトル（必須）
  description?: string;    // 詳細説明（オプション）
  completed: boolean;      // 完了状態
  priority: Priority;      // 優先度
  dueDate: string | null;  // 期限（ISO 8601形式）
  createdAt: string;       // 作成日時
  updatedAt: string;       // 更新日時
}
