import React from 'react';
import { useTodoStore } from '../store/todoStore';
import { TodoFilter } from '../types/todo';

const filters: { label: string; value: TodoFilter }[] = [
  { label: 'All Tasks', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function TodoFilters() {
  const { filter, setFilter, clearCompleted } = useTodoStore();

  return (
    <div className="flex justify-between items-center gap-2 flex-wrap">
      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === f.value
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-primary-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <button
        onClick={() => clearCompleted()}
        className="px-4 py-2 text-sm text-danger hover:bg-red-50 rounded-lg transition"
      >
        Clear Completed
      </button>
    </div>
  );
}
