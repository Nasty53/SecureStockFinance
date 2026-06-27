import React, { useState } from 'react';
import { useTodoStore } from '../store/todoStore';
import { Todo, TodoPriority } from '../types/todo';
import TodoEditModal from './TodoEditModal';

const priorityColors = {
  low: 'bg-blue-100 text-blue-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
};

const priorityIcons = {
  low: '↓',
  medium: '→',
  high: '↑',
};

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const { toggleTodo, deleteTodo } = useTodoStore();
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString();
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <>
      <div className={`p-4 flex gap-4 items-start hover:bg-slate-50 transition ${
        todo.completed ? 'bg-slate-50' : ''
      }`}>
        <button
          onClick={() => toggleTodo(todo.id)}
          className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
            todo.completed
              ? 'bg-primary-500 border-primary-500'
              : 'border-slate-300 hover:border-primary-500'
          }`}
        >
          {todo.completed && <span className="text-white font-bold">✓</span>}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-medium ${
              todo.completed
                ? 'text-slate-400 line-through'
                : 'text-slate-900'
            }`}>
              {todo.title}
            </h3>
            <span className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
              priorityColors[todo.priority]
            }`}>
              {priorityIcons[todo.priority]}
            </span>
          </div>

          {todo.description && (
            <p className="text-sm text-slate-600 mt-1">{todo.description}</p>
          )}

          <div className="flex flex-wrap gap-2 mt-2">
            {todo.tags?.map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded"
              >
                #{tag}
              </span>
            ))}
            {todo.dueDate && (
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                isOverdue
                  ? 'bg-red-100 text-red-700'
                  : 'bg-slate-100 text-slate-600'
              }`}>
                📅 {formatDate(todo.dueDate)}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={() => setShowEditModal(true)}
            className="p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-100 rounded transition"
            title="Edit"
          >
            ✎
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="p-2 text-slate-400 hover:text-danger hover:bg-red-50 rounded transition"
            title="Delete"
          >
            ✕
          </button>
        </div>
      </div>
      
      {showEditModal && (
        <TodoEditModal
          todo={todo}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
}
