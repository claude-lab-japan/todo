import { FilterType } from '../types/todo';
import './TodoFilter.css';

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export function TodoFilter({ currentFilter, onFilterChange, counts }: TodoFilterProps) {
  return (
    <div className="todo-filter">
      <button
        onClick={() => onFilterChange('all')}
        className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
      >
        すべて <span className="count">{counts.all}</span>
      </button>
      <button
        onClick={() => onFilterChange('active')}
        className={`filter-btn ${currentFilter === 'active' ? 'active' : ''}`}
      >
        未完了 <span className="count">{counts.active}</span>
      </button>
      <button
        onClick={() => onFilterChange('completed')}
        className={`filter-btn ${currentFilter === 'completed' ? 'active' : ''}`}
      >
        完了 <span className="count">{counts.completed}</span>
      </button>
    </div>
  );
}
