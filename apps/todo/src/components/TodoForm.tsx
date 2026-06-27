import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTodoStore } from '../store/todoStore';
import { TodoPriority } from '../types/todo';

const todoSchema = z.object({
  title: z.string().min(1, 'Title is required').min(3, 'Title must be at least 3 characters'),
  priority: z.enum(['low', 'medium', 'high'] as const),
  dueDate: z.string().optional(),
  tags: z.string().optional(),
});

type TodoFormData = z.infer<typeof todoSchema>;

export default function TodoForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TodoFormData>({
    defaultValues: { priority: 'medium' },
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const addTodo = useTodoStore((state) => state.addTodo);

  const onSubmit = (data: TodoFormData) => {
    const tags = data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : undefined;
    addTodo(data.title, data.priority as TodoPriority, data.dueDate, tags);
    reset();
    setShowAdvanced(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4 animate-fadeIn">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Task Title</label>
        <input
          {...register('title')}
          type="text"
          placeholder="Add a new task..."
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
        />
        {errors.title && <p className="text-sm text-danger mt-1">{errors.title.message}</p>}
      </div>

      {showAdvanced && (
        <div className="space-y-4 pt-4 border-t border-slate-200 animate-slideIn">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
              <select
                {...register('priority')}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Due Date</label>
              <input
                {...register('dueDate')}
                type="date"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tags (comma separated)</label>
            <input
              {...register('tags')}
              type="text"
              placeholder="work, urgent, personal"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 px-4 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition active:scale-95"
        >
          Add Task
        </button>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="px-4 py-3 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition"
          title="Advanced options"
        >
          ⚙
        </button>
      </div>
    </form>
  );
}
