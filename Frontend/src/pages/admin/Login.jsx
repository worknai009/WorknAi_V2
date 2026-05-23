import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      window.location.href = '/admin/dashboard';
    } catch (error) {
      alert('Login failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 p-10 shadow-xl">
        <h1 className="mb-6 text-3xl font-semibold">Admin Login</h1>
        <label className="block mb-4">
          <span className="text-slate-300">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-violet-500"
            required
          />
        </label>
        <label className="block mb-6">
          <span className="text-slate-300">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-violet-500"
            required
          />
        </label>
        <button className="w-full rounded-2xl bg-violet-500 px-5 py-3 text-white hover:bg-violet-400">
          Sign In
        </button>
      </form>
    </div>
  );
}
