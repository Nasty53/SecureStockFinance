import { useTodoStore } from "../stores/todoStore";
import { Filter } from "../types";

export default function FilterBar() {
  const { filter, setFilter, searchQuery, setSearchQuery, clearCompleted } =
    useTodoStore();

  const handleStatusChange = (status: Filter["status"]) => {
    setFilter({ ...filter, status });
  };

  const handlePriorityChange = (priority?: Filter["priority"]) => {
    setFilter({ ...filter, priority });
  };

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Search</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          placeholder="Search todos..."
        />
      </div>

      {/* Status Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <div className="mt-2 flex gap-2 flex-wrap">
          {(["all", "active", "completed"] as const).map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                filter.status === status
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Priority Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Priority</label>
        <div className="mt-2 flex gap-2 flex-wrap">
          <button
            onClick={() => handlePriorityChange(undefined)}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              !filter.priority
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {(["low", "medium", "high"] as const).map((priority) => (
            <button
              key={priority}
              onClick={() => handlePriorityChange(priority)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                filter.priority === priority
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <button
        onClick={clearCompleted}
        className="w-full rounded-lg border border-red-300 px-4 py-2 font-medium text-red-600 hover:bg-red-50 transition-colors"
      >
        Clear Completed
      </button>
    </div>
  );
}
