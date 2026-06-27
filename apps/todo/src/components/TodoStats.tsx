import React from 'react';
import { useTodoStore } from '../store/todoStore';

export default function TodoStats() {
  const getTodoStats = useTodoStore((state) => state.getTodoStats);
  const stats = getTodoStats();
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <p className="text-sm text-slate-600 font-medium">Total Tasks</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{stats.total}</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <p className="text-sm text-slate-600 font-medium">Active</p>
        <p className="text-2xl font-bold text-primary-500 mt-1">{stats.active}</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <p className="text-sm text-slate-600 font-medium">Completed</p>
        <p className="text-2xl font-bold text-emerald mt-1">{completionRate}%</p>
      </div>
    </div>
  );
}
