import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Todo, Priority, FilterType } from '../types/todo';
import { useLocalStorage } from './useLocalStorage';

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useLocalStorage<FilterType>('filter', 'all');

  // タスクの追加
  const addTodo = (title: string, description?: string, priority: Priority = 'medium', dueDate: string | null = null) => {
    const newTodo: Todo = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      priority,
      dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // タスクの更新
  const updateTodo = (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  };

  // タスクの削除
  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // 完了状態のトグル
  const toggleComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  };

  // フィルタリングされたタスク一覧
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return {
    todos: filteredTodos,
    allTodos: todos,
    filter,
    setFilter,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
  };
}
