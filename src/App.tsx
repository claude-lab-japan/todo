import { useMemo } from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/TodoForm';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import './App.css';

function App() {
  const {
    todos,
    allTodos,
    filter,
    setFilter,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
  } = useTodos();

  const counts = useMemo(() => ({
    all: allTodos.length,
    active: allTodos.filter(todo => !todo.completed).length,
    completed: allTodos.filter(todo => todo.completed).length,
  }), [allTodos]);

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>TODO アプリ</h1>
          <p className="subtitle">タスクを整理して生産性を向上</p>
        </header>

        <TodoForm onAdd={addTodo} />

        <TodoFilter
          currentFilter={filter}
          onFilterChange={setFilter}
          counts={counts}
        />

        <TodoList
          todos={todos}
          onToggle={toggleComplete}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
