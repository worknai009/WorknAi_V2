import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  return (
    <section>
      <h1 className="font-display text-3xl font-bold text-white">Profile</h1>
      <div className="mt-6 panel-card max-w-md space-y-3">
        <div>
          <p className="field-label">Name</p>
          <p className="text-slate-100">{user?.name}</p>
        </div>
        <div>
          <p className="field-label">Email</p>
          <p className="text-slate-100">{user?.email}</p>
        </div>
        <div>
          <p className="field-label">Role</p>
          <span className="text-xs font-medium text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase">
            {user?.role}
          </span>
        </div>
      </div>
    </section>
  );
}
