import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();

const onSubmit = async (data) => {
  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || 'Login failed');
    }

    localStorage.setItem('token', result.token);
    await onLogin();
    nav('/dashboard');
  } catch (err) {
    alert(err.message);
  }
};

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register('email')} type="email" placeholder="Email" className="w-full p-2 border rounded" required />
        <input {...register('password')} type="password" placeholder="Password" className="w-full p-2 border rounded" required />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
      <p className="mt-3 text-sm">New user? <a className="text-blue-600" href="/register">Register</a></p>
    </div>
  );
}
