import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <section>
      <h1 className="font-display text-3xl font-bold text-white">Dashboard</h1>
      <p className="mt-2 text-slate-400">Welcome back, {user?.name}. You have full admin access.</p>
    </section>
  );
}
