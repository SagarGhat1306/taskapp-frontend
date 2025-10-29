import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';

export default function TaskForm({ onCreated }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post('/tasks', data);
      reset();
      onCreated();
    } catch (err) {
      alert('Create failed');
    }
  };

  return (
<form
  onSubmit={handleSubmit(onSubmit)}
  className="mb-6 bg-white p-4 rounded shadow space-y-3"
>
  {/* Task title + tags */}
  <div className="flex flex-col sm:flex-row gap-3">
    <input
      {...register("title")}
      placeholder="Task title"
      className="flex-1 p-2 border rounded w-full sm:w-auto"
      required
    />
    <input
      {...register("tags")}
      placeholder="Tags (comma separated)"
      className="p-2 border rounded w-full sm:w-48"
    />
  </div>

  {/* Description */}
  <textarea
    {...register("description")}
    placeholder="Description"
    className="w-full p-2 border rounded"
  />

  {/* Add Task button */}
  <div className="flex justify-end">
    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
      Add Task
    </button>
  </div>
</form>

  );
}
