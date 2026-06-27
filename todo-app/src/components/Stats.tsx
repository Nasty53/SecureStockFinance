import { useTodoStore } from "../stores/todoStore";

export default function Stats() {
  const stats = useTodoStore((state) => state.getTodoStats());

  const statCards = [
    { label: "Total", value: stats.total, color: "bg-blue-100", textColor: "text-blue-600" },
    {
      label: "Active",
      value: stats.active,
      color: "bg-yellow-100",
      textColor: "text-yellow-600",
    },
    {
      label: "Completed",
      value: stats.completed,
      color: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      label: "High Priority",
      value: stats.high,
      color: "bg-red-100",
      textColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-lg ${stat.color} p-4 text-center`}
        >
          <div className={`text-2xl font-bold ${stat.textColor}`}>
            {stat.value}
          </div>
          <div className="mt-1 text-xs font-medium text-gray-600">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
