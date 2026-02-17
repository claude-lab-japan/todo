import { useState, FormEvent } from 'react';
import { Priority } from '../types/todo';
import './TodoForm.css';

interface TodoFormProps {
  onAdd: (title: string, description?: string, priority?: Priority, dueDate?: string | null) => void;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    onAdd(
      title,
      description || undefined,
      priority,
      dueDate || null
    );

    // フォームをリセット
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setIsExpanded(false);
  };

  return (
    <div className="todo-form-container">
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-main">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="新しいタスクを追加..."
            className="form-title-input"
          />
        </div>

        {isExpanded && (
          <div className="form-expanded">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="説明（オプション）"
              className="form-description-input"
              rows={3}
            />
            <div className="form-options">
              <div className="form-group">
                <label htmlFor="priority">優先度:</label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className="form-priority-select"
                >
                  <option value="high">高</option>
                  <option value="medium">中</option>
                  <option value="low">低</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="dueDate">期限:</label>
                <input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="form-date-input"
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-add">追加</button>
              <button
                type="button"
                onClick={() => {
                  setTitle('');
                  setDescription('');
                  setPriority('medium');
                  setDueDate('');
                  setIsExpanded(false);
                }}
                className="btn-cancel"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
