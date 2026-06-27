import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
        <div className="text-4xl mb-2">📭</div>
        <p className="text-slate-600 font-medium">No tasks to show</p>
        <p className="text-slate-500 text-sm mt-1">Create a new task to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
      {todos.map((todo, index) => (
        <div key={todo.id} className={index !== todos.length - 1 ? 'border-b border-slate-100' : ''}>
          <TodoItem todo={todo} />
        </div>
      ))}
    </div>
  );
}
