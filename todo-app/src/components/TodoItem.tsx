import { motion } from "framer-motion";
import { Todo } from "../types";
import { useTodoStore } from "../stores/todoStore";

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

const priorityColors = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

export default function TodoItem({ todo, onEdit }: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useTodoStore();

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`rounded-lg border-2 p-4 transition-all ${
        todo.completed
          ? "border-gray-200 bg-gray-50"
          : "border-gray-200 bg-white hover:border-primary-300"
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="mt-1 h-5 w-5 cursor-pointer rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-medium ${
              todo.completed
                ? "line-through text-gray-400"
                : "text-gray-900"
            }`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p
              className={`mt-1 text-sm ${
                todo.completed ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {todo.description}
            </p>
          )}

          {/* Meta Info */}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className={`rounded-full px-2 py-1 text-xs font-medium ${priorityColors[todo.priority]}`}>
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </span>
            {todo.category && (
              <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800">
                {todo.category}
              </span>
            )}
            {todo.dueDate && (
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                📅 {formatDate(todo.dueDate)}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(todo)}
            className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200 transition-colors"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200 transition-colors"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </motion.div>
  );
}
