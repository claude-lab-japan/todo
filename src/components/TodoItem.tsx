import { useState } from 'react';
import { Todo, Priority } from '../types/todo';
import './TodoItem.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, {
        title: editTitle,
        description: editDescription || undefined,
        priority: editPriority,
        dueDate: editDueDate || null,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditPriority(todo.priority);
    setEditDueDate(todo.dueDate || '');
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  if (isEditing) {
    return (
      <div className={`todo-item editing priority-${todo.priority}`}>
        <div className="todo-edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="タスク名"
            className="edit-title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="説明（オプション）"
            className="edit-description"
          />
          <div className="edit-meta">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as Priority)}
              className="edit-priority"
            >
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="edit-due-date"
            />
          </div>
          <div className="edit-actions">
            <button onClick={handleSave} className="btn-save">保存</button>
            <button onClick={handleCancel} className="btn-cancel">キャンセル</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        <div className="todo-details">
          <h3 className="todo-title">{todo.title}</h3>
          {todo.description && <p className="todo-description">{todo.description}</p>}
          <div className="todo-meta">
            <span className={`priority-badge priority-${todo.priority}`}>
              {todo.priority === 'high' ? '高' : todo.priority === 'medium' ? '中' : '低'}
            </span>
            {todo.dueDate && (
              <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
                期限: {formatDate(todo.dueDate)}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="todo-actions">
        <button onClick={() => setIsEditing(true)} className="btn-edit">編集</button>
        <button onClick={() => onDelete(todo.id)} className="btn-delete">削除</button>
      </div>
    </div>
  );
}
