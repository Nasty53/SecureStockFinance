export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  category?: string;
}

export interface Filter {
  status: "all" | "active" | "completed";
  priority?: "low" | "medium" | "high";
  category?: string;
}
