import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTodoStore } from '../store/todoStore';
import { Todo } from '../types/todo';

const editSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.string().optional(),
  tags: z.string().optional(),
});

type EditFormData = z.infer<typeof editSchema>;

interface TodoEditModalProps {
  todo: Todo;
  onClose: () => void;
}

export default function TodoEditModal({ todo, onClose }: TodoEditModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<EditFormData>({
    defaultValues: {
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      dueDate: todo.dueDate,
      tags: todo.tags?.join(', '),
    },
  });
  const updateTodo = useTodoStore((state) => state.updateTodo);

  const onSubmit = (data: EditFormData) => {
    const tags = data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : undefined;
    updateTodo(todo.id, {
      title: data.title,
      description: data.description,
      priority: data.priority as any,
      dueDate: data.dueDate,
      tags,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-slideIn">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
            <input
              {...register('title')}
              type="text"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <textarea
              {...register('description')}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none h-20"
            />
          </div>

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
            <label className="block text-sm font-medium text-slate-700 mb-2">Tags</label>
            <input
              {...register('tags')}
              type="text"
              placeholder="work, urgent"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
