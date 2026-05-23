import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import api from '../utils/api';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [view, setView]         = useState('login'); // 'login' | 'forgot' | 'sent'
  const [forgotEmail, setForgotEmail]         = useState('');
  const [forgotLoading, setForgotLoading]     = useState(false);
  const [forgotError, setForgotError]         = useState('');

  const { login } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      if (err.response?.status === 401 || err.message?.includes('401')) {
        setError('Invalid email or password.');
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotLoading(true);
    try {
      await api.post('/auth/forgot-password', { email: forgotEmail });
      setView('sent');
    } catch (err) {
      setForgotError(err?.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="font-display text-3xl font-bold text-white">WorknAi</span>
          <span className="ml-2 text-sm font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Manager</span>
          <p className="mt-2 text-slate-400 text-sm">
            {view === 'login' ? 'Sign in to access the manager panel' : 'Reset your credentials'}
          </p>
        </div>

        {/* ── LOGIN FORM ── */}
        {view === 'login' && (
          <form onSubmit={handleSubmit} className="panel-card space-y-5">
            {error && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">{error}</div>
            )}

            <div>
              <label className="field-label">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="field pl-9" placeholder="manager@worknai.com" required />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="field-label" style={{ marginBottom: 0 }}>Password</label>
                <button type="button" onClick={() => { setView('forgot'); setForgotEmail(email); }}
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative mt-1.5">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  className="field pl-9" placeholder="••••••••" required />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 rounded-xl">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        )}

        {/* ── FORGOT PASSWORD FORM ── */}
        {view === 'forgot' && (
          <form onSubmit={handleForgot} className="panel-card space-y-5">
            {forgotError && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">{forgotError}</div>
            )}
            <p className="text-slate-400 text-sm">Enter your registered email and we'll send you a reset link.</p>
            <div>
              <label className="field-label">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)}
                  className="field pl-9" placeholder="manager@worknai.com" required />
              </div>
            </div>
            <button type="submit" disabled={forgotLoading} className="btn-primary w-full justify-center py-3 rounded-xl">
              {forgotLoading ? <><Loader2 size={14} className="animate-spin inline mr-2" />Sending...</> : 'Send Reset Link'}
            </button>
            <button type="button" onClick={() => setView('login')}
              className="w-full flex items-center justify-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={13} /> Back to Login
            </button>
          </form>
        )}

        {/* ── EMAIL SENT ── */}
        {view === 'sent' && (
          <div className="panel-card text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle className="w-7 h-7 text-emerald-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Check Your Email</h2>
            <p className="text-slate-400 text-sm">
              A reset link has been sent to <span className="text-white font-medium">{forgotEmail}</span>.
              Click the link in the email to reset your credentials.
            </p>
            <button onClick={() => setView('login')}
              className="w-full flex items-center justify-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors pt-2">
              <ArrowLeft size={13} /> Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
