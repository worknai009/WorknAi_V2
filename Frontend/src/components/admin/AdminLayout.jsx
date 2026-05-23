import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import worknaiLogo from '../../assets/worknai_logo.png';

export default function AdminLayout() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/90 sticky top-0 z-40">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-2">
            <img src={worknaiLogo} alt="WorknAi" className="h-8 w-auto object-contain" />
            <span className="font-display text-xl font-semibold text-slate-100">Admin</span>
          </div>
          <nav className="flex flex-wrap gap-3 text-sm text-slate-300">
            <NavLink to="dashboard" className={({ isActive }) => isActive ? 'text-violet-300' : 'hover:text-white'}>Dashboard</NavLink>
            <NavLink to="users" className={({ isActive }) => isActive ? 'text-violet-300' : 'hover:text-white'}>Users</NavLink>
            <NavLink to="courses" className={({ isActive }) => isActive ? 'text-violet-300' : 'hover:text-white'}>Courses</NavLink>
            <NavLink to="jobs" className={({ isActive }) => isActive ? 'text-violet-300' : 'hover:text-white'}>Jobs</NavLink>
            <NavLink to="profile" className={({ isActive }) => isActive ? 'text-violet-300' : 'hover:text-white'}>Profile</NavLink>
          </nav>
          <button onClick={logout} className="rounded-full border border-violet-500 px-4 py-2 text-sm text-violet-100 hover:bg-violet-500/10">
            Logout
          </button>
        </div>
      </header>
      <main className="container-x py-10">
        <Outlet />
      </main>
    </div>
  );
}
