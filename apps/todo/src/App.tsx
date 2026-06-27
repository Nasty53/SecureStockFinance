import React from 'react';
import TodoHeader from './components/TodoHeader';
import TodoForm from './components/TodoForm';
import TodoFilters from './components/TodoFilters';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import { useTodoStore } from './store/todoStore';

export default function App() {
  const { todos, filter } = useTodoStore();
  const filteredTodos = useTodoStore((state) => state.getFilteredTodos());

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <TodoHeader />
        <div className="space-y-6 mt-8">
          <TodoForm />
          <TodoStats />
          <TodoFilters />
          <TodoList todos={filteredTodos} />
        </div>
      </div>
    </div>
  );
}
