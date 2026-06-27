import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Todo, Filter } from "../types";

interface TodoStore {
  todos: Todo[];
  filter: Filter;
  searchQuery: string;
  addTodo: (todo: Omit<Todo, "id" | "createdAt" | "updatedAt">) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  setFilter: (filter: Filter) => void;
  setSearchQuery: (query: string) => void;
  clearCompleted: () => void;
  getFilteredTodos: () => Todo[];
  getTodoStats: () => {
    total: number;
    completed: number;
    active: number;
    high: number;
    medium: number;
    low: number;
  };
}

const generateId = () => Math.random().toString(36).substring(2, 11);

export const useTodoStore = create<TodoStore>()(n  (set, get) => ({
    todos: [],
    filter: { status: "all" },
    searchQuery: "",

    addTodo: (todo) =>
      set((state) => ({
        todos: [
          ...state.todos,
          {
            ...todo,
            id: generateId(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      })),

    updateTodo: (id, updates) =>
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id
            ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
            : todo
        ),
      })),

    deleteTodo: (id) =>
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      })),

    toggleTodo: (id) =>
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                completed: !todo.completed,
                updatedAt: new Date().toISOString(),
              }
            : todo
        ),
      })),

    setFilter: (filter) => set({ filter }),
    setSearchQuery: (query) => set({ searchQuery: query }),

    clearCompleted: () =>
      set((state) => ({
        todos: state.todos.filter((todo) => !todo.completed),
      })),

    getFilteredTodos: () => {
      const state = get();
      return state.todos.filter((todo) => {
        // Filter by status
        if (state.filter.status === "active" && todo.completed) return false;
        if (state.filter.status === "completed" && !todo.completed) return false;

        // Filter by priority
        if (state.filter.priority && todo.priority !== state.filter.priority)
          return false;

        // Filter by category
        if (state.filter.category && todo.category !== state.filter.category)
          return false;

        // Filter by search query
        if (state.searchQuery) {
          const query = state.searchQuery.toLowerCase();
          return (
            todo.title.toLowerCase().includes(query) ||
            todo.description?.toLowerCase().includes(query)
          );
        }

        return true;
      });
    },

    getTodoStats: () => {
      const state = get();
      return {
        total: state.todos.length,
        completed: state.todos.filter((t) => t.completed).length,
        active: state.todos.filter((t) => !t.completed).length,
        high: state.todos.filter((t) => t.priority === "high").length,
        medium: state.todos.filter((t) => t.priority === "medium").length,
        low: state.todos.filter((t) => t.priority === "low").length,
      };
    },
  }),
  {
    name: "todo-storage",
  }
);
