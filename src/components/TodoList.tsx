import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';
import './TodoList.css';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggle, onUpdate, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>タスクがありません</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
