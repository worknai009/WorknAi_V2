import { useAuth } from '../../context/AuthContext';

export default function HRProfile() {
  const { user } = useAuth();
  return (
    <section>
      <h1 className="font-display text-3xl font-bold text-white">Profile</h1>
      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 max-w-md space-y-3">
        <div>
          <p className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Name</p>
          <p className="text-slate-100">{user?.name}</p>
        </div>
        <div>
          <p className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Email</p>
          <p className="text-slate-100">{user?.email}</p>
        </div>
        <div>
          <p className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Role</p>
          <span className="text-xs font-medium text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded-full uppercase">
            {user?.role}
          </span>
        </div>
      </div>
    </section>
  );
}
