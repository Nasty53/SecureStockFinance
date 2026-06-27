import { create } from 'zustand';
import { Todo, TodoState, TodoFilter, TodoPriority } from '../types/todo';

const STORAGE_KEY = 'securestock-todos';

const loadTodosFromStorage = (): Todo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load todos from storage:', error);
    return [];
  }
};

const saveTodosToStorage = (todos: Todo[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Failed to save todos to storage:', error);
  }
};

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: loadTodosFromStorage(),
  filter: 'all',

  addTodo: (title: string, priority: TodoPriority = 'medium', dueDate?: string, tags?: string[]) => {
    if (!title.trim()) return;
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      priority,
      dueDate,
      tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => {
      const updated = [newTodo, ...state.todos];
      saveTodosToStorage(updated);
      return { todos: updated };
    });
  },

  updateTodo: (id: string, updates: Partial<Todo>) => {
    set((state) => {
      const updated = state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
          : todo
      );
      saveTodosToStorage(updated);
      return { todos: updated };
    });
  },

  deleteTodo: (id: string) => {
    set((state) => {
      const updated = state.todos.filter((todo) => todo.id !== id);
      saveTodosToStorage(updated);
      return { todos: updated };
    });
  },

  toggleTodo: (id: string) => {
    set((state) => {
      const updated = state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
          : todo
      );
      saveTodosToStorage(updated);
      return { todos: updated };
    });
  },

  setFilter: (filter: TodoFilter) => {
    set({ filter });
  },

  getFilteredTodos: () => {
    const { todos, filter } = get();
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  },

  clearCompleted: () => {
    set((state) => {
      const updated = state.todos.filter((todo) => !todo.completed);
      saveTodosToStorage(updated);
      return { todos: updated };
    });
  },

  getTodoStats: () => {
    const { todos } = get();
    return {
      total: todos.length,
      completed: todos.filter((todo) => todo.completed).length,
      active: todos.filter((todo) => !todo.completed).length,
    };
  },
}));
