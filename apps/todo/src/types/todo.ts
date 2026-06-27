export type TodoPriority = 'low' | 'medium' | 'high';
export type TodoFilter = 'all' | 'active' | 'completed';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: TodoPriority;
  dueDate?: string; // ISO string
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  tags?: string[];
}

export interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
  addTodo: (title: string, priority?: TodoPriority, dueDate?: string, tags?: string[]) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  setFilter: (filter: TodoFilter) => void;
  getFilteredTodos: () => Todo[];
  clearCompleted: () => void;
  getTodoStats: () => { total: number; completed: number; active: number };
}
