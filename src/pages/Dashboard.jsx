import React, { useEffect, useState } from 'react';
import api from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import Navbar from '../components/Navbar';

export default function Dashboard({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState('');
  const [filterCompleted, setFilterCompleted] = useState('');

  const fetchTasks = async () => {
    const params = {};
    if (query) params.q = query;
    if (filterCompleted) params.completed = filterCompleted;
    const res = await api.get('/tasks', { params });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sticky Navbar at the top */}
      <Navbar user={user} onLogout={onLogout} />

      {/* Main Content Section */}
     <div className="pt-[100px] px-6 w-full max-w-[100%]">

        <div className="mb-4 flex flex-col sm:flex-row gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks..."
            className="flex-1 p-2 border rounded"
          />
          <select
            value={filterCompleted}
            onChange={(e) => setFilterCompleted(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All</option>
            <option value="true">Completed</option>
            <option value="false">Pending</option>
          </select>
          <button
            onClick={fetchTasks}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        <TaskForm onCreated={fetchTasks} />
        <TaskList tasks={tasks} onChange={fetchTasks} />
      </div>
    </div>
  );
}
