import React from 'react';
import api from '../services/api';

export default function TaskList({ tasks, onChange }) {
  const toggleComplete = async (task) => {
    await api.put(`/tasks/${task._id}`, { completed: !task.completed });
    onChange();
  };

  const remove = async (id) => {
    if (!confirm('Delete task?')) return;
    await api.delete(`/tasks/${id}`);
    onChange();
  };

  if (!tasks || tasks.length === 0) return <div className="text-center py-6 text-gray-500">No tasks</div>;

  return (
<div className="space-y-3">
  {tasks.map((t) => (
    <div
      key={t._id}
      className="bg-white p-4 rounded shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
    >
      {/* Task Info */}
      <div className="flex-1 text-center sm:text-left">
        <div
          className={`font-semibold ${
            t.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {t.title}
        </div>
        <div className="text-sm text-gray-600">{t.description}</div>
        <div className="text-xs text-gray-500">{t.tags?.join(", ")}</div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center sm:justify-end items-center gap-2">
        <button
          onClick={() => toggleComplete(t)}
          className="px-3 py-1 border rounded hover:bg-gray-100 transition"
        >
          {t.completed ? "Undo" : "Done"}
        </button>
        <button
          onClick={() => remove(t._id)}
          className="px-3 py-1 border rounded text-red-600 hover:bg-red-50 transition"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

  );
}
