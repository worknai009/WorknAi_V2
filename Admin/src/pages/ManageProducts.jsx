import { useEffect, useState } from 'react';
import api from '../utils/api';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const empty = { title: '', description: '', category: '', url: '', techStack: '' };

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);

  const load = () => {
    setLoading(true);
    api.get('/products/manage').then(r => setProducts(r.data.data)).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await api.put(`/products/${editing}`, form); toast.success('Product updated'); }
      else { await api.post('/products', form); toast.success('Product added'); }
      setForm(empty); setEditing(null); setShowForm(false); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
  };

  const startEdit = (p) => {
    setForm({ title: p.title, description: p.description, category: p.category, url: p.url, techStack: p.techStack?.join(', ') || '' });
    setEditing(p._id); setShowForm(true); window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try { await api.delete(`/products/${id}`); toast.success('Deleted'); load(); }
    catch (err) { toast.error(err.response?.data?.message || 'Error'); }
  };

  const cancel = () => { setForm(empty); setEditing(null); setShowForm(false); };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Manage Products</h1>
          <p className="mt-1 text-slate-400 text-sm">Websites & software products</p>
        </div>
        <button onClick={() => { cancel(); setShowForm(v => !v); }} className="btn-primary">
          {showForm && !editing ? <><X size={15} /> Cancel</> : <><Plus size={15} /> Add Product</>}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="panel-card mb-6 grid sm:grid-cols-2 gap-4">
          <h2 className="sm:col-span-2 text-sm font-semibold text-slate-300">{editing ? 'Edit Product' : 'New Product'}</h2>
          <div className="sm:col-span-2">
            <label className="field-label">Product Name *</label>
            <input className="field" value={form.title} onChange={f('title')} placeholder="WorknAi HRMS" required />
          </div>
          <div className="sm:col-span-2">
            <label className="field-label">Description</label>
            <textarea className="field" rows={3} value={form.description} onChange={f('description')} placeholder="What does this product do..." />
          </div>
          <div>
            <label className="field-label">Category</label>
            <input className="field" value={form.category} onChange={f('category')} placeholder="HRMS / CRM / Website" />
          </div>
          <div>
            <label className="field-label">Website URL</label>
            <input type="url" className="field" value={form.url} onChange={f('url')} placeholder="https://..." />
          </div>
          <div className="sm:col-span-2">
            <label className="field-label">Tech Stack (comma separated)</label>
            <input className="field" value={form.techStack} onChange={f('techStack')} placeholder="React, Node.js, MongoDB" />
          </div>
          <div className="sm:col-span-2 flex gap-3">
            <button type="submit" className="btn-primary"><Check size={15} /> {editing ? 'Update' : 'Add'}</button>
            <button type="button" onClick={cancel} className="btn-ghost"><X size={15} /> Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-7 h-7 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="panel-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-left py-3 px-4">Tech Stack</th>
                <th className="text-left py-3 px-4">Posted By</th>
                <th className="text-left py-3 px-4">URL</th>
                <th className="py-3 px-4" />
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-3 px-4 text-slate-100 font-medium">{p.title}</td>
                  <td className="py-3 px-4 text-slate-400">{p.category || '—'}</td>
                  <td className="py-3 px-4 text-slate-400 text-xs">{p.techStack?.slice(0,3).join(', ') || '—'}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs text-slate-300">{p.postedBy?.name}</span>
                    <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full border uppercase font-medium text-emerald-300 bg-emerald-500/10 border-emerald-500/30">{p.postedBy?.role}</span>
                  </td>
                  <td className="py-3 px-4">
                    {p.url ? <a href={p.url} target="_blank" rel="noreferrer" className="text-violet-400 hover:text-violet-300 text-xs truncate max-w-[120px] block">Visit ↗</a> : <span className="text-slate-500">—</span>}
                  </td>
                  <td className="py-3 px-4 text-right flex gap-1 justify-end">
                    <button onClick={() => startEdit(p)} className="p-1.5 text-slate-500 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-colors"><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(p._id)} className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
              {!products.length && <tr><td colSpan={6} className="py-12 text-center text-slate-500">No products found</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
