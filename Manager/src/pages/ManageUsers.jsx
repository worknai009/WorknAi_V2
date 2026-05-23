import { useEffect, useState } from 'react';
import api from '../utils/api';
import { Trash2, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'hr' });

  const load = () => {
    setLoading(true);
    api.get('/users').then(r => setUsers(r.data.data)).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users', { ...form, role: 'hr' });
      toast.success('HR account created');
      setForm({ name: '', email: '', password: '', role: 'hr' });
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create user');
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">HR Accounts</h1>
          <p className="mt-1 text-slate-400 text-sm">Create and view HR team members</p>
        </div>
        <button onClick={() => setShowForm(v => !v)} className="btn-primary">
          {showForm ? <><X size={15} /> Cancel</> : <><Plus size={15} /> New HR Account</>}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="panel-card mb-6 grid sm:grid-cols-2 gap-4">
          <div>
            <label className="field-label">Full Name</label>
            <input className="field" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="HR Employee Name" required />
          </div>
          <div>
            <label className="field-label">Email</label>
            <input type="email" className="field" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="hr@worknai.com" required />
          </div>
          <div>
            <label className="field-label">Password</label>
            <input type="password" className="field" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Min 6 characters" required minLength={6} />
          </div>
          <div className="flex items-end">
            <button type="submit" className="btn-primary">Create HR Account</button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-7 h-7 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="panel-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-left py-3 px-4">Created</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-3 px-4 text-slate-100 font-medium">{u.name}</td>
                  <td className="py-3 px-4 text-slate-400">{u.email}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2 py-0.5 rounded-full border font-medium uppercase text-sky-300 bg-sky-500/10 border-sky-500/30">HR</span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {!users.length && <tr><td colSpan={4} className="py-12 text-center text-slate-500">No HR accounts yet</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
