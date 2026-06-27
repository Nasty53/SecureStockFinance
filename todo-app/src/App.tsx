import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useTodoStore } from "./stores/todoStore";
import { Todo } from "./types";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import FilterBar from "./components/FilterBar";
import Stats from "./components/Stats";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const getFilteredTodos = useTodoStore((state) => state.getFilteredTodos);

  const filteredTodos = getFilteredTodos();

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTodo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-900">📝 Todo App</h1>
          <p className="mt-1 text-gray-600">Stay organized with local storage</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <Stats />

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <FilterBar />
          </aside>

          {/* Main Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Todo Button */}
            <button
              onClick={() => setShowForm(!showForm)}
              className="w-full rounded-lg bg-primary-600 px-6 py-3 text-lg font-semibold text-white hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
            >
              {showForm ? "Cancel" : "➕ Add New Todo"}
            </button>

            {/* Form */}
            {showForm && (
              <TodoForm
                editingTodo={editingTodo}
                onClose={handleCloseForm}
              />
            )}

            {/* Todos List */}
            <div className="space-y-3">
              {filteredTodos.length === 0 ? (
                <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                  <p className="text-lg text-gray-600">No todos yet! 🎉</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Add a new todo to get started.
                  </p>
                </div>
              ) : (
                <AnimatePresence>
                  {filteredTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onEdit={handleEdit}
                    />
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/50 py-6 text-center text-sm text-gray-600 mt-12">
        <p>✨ All data is saved locally in your browser using localStorage</p>
      </footer>
    </div>
  );
}
