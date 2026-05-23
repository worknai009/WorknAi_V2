import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, User, LogOut, LayoutDashboard, BookOpen, ChevronDown } from 'lucide-react';
import worknaiLogo from '../../assets/worknai_logo.png';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const guestNavItems = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/products', label: 'Products' },
  { to: '/career', label: 'Career' },
  { to: '/about', label: 'About' },
];

const userNavItems = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/products', label: 'Products' },
  { to: '/career', label: 'Career' },
  { to: '/about', label: 'About' },
  { to: '/user/dashboard', label: 'Dashboard' },
  { to: '/user/my-courses', label: 'My Courses' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isUser, logout } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
    setDropdownOpen(false);
  };

  const navItems = user && isUser ? userNavItems : guestNavItems;

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#0d0d1a]/90 backdrop-blur-xl border-b border-violet-500/20 shadow-lg shadow-violet-900/10'
            : 'bg-[#0d0d1a]/70 backdrop-blur-md border-b border-white/5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 py-2 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <img src={worknaiLogo} alt="WorknAi" className="h-16 w-auto object-contain" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative px-3 py-1.5 text-sm font-medium transition-colors rounded-full whitespace-nowrap ${
                    isActive ? 'text-white' : 'text-ink-dim hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 bg-violet-500/20 border border-violet-400/30 rounded-full"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* CTA / Auth buttons */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-400/30 bg-violet-500/10 hover:bg-violet-500/20 transition-colors text-sm font-medium text-white"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-xs font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-[#0d0d1a]/95 backdrop-blur-xl border border-violet-500/20 rounded-xl shadow-xl shadow-violet-900/20 py-1.5 z-50"
                    >
                      <Link
                        to="/user/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-dim hover:text-white hover:bg-violet-500/10 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <Link
                        to="/user/my-courses"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-dim hover:text-white hover:bg-violet-500/10 transition-colors"
                      >
                        <BookOpen className="w-4 h-4" />
                        My Courses
                      </Link>
                      <div className="border-t border-violet-500/10 my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/join-us" className="btn-ghost text-sm !px-4 !py-2">
                  Join Us
                </Link>
                <Link to="/login" className="btn-primary text-sm !px-4 !py-2">
                  Login
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden p-2 rounded-lg border border-line2 text-ink"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-[65px] left-0 right-0 z-50 lg:hidden"
          >
            <div className="bg-[#0d0d1a]/95 backdrop-blur-xl border-b border-violet-500/20 px-6 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-3 text-base font-medium rounded-xl ${
                      isActive
                        ? 'bg-violet-500/20 text-white border border-violet-400/30'
                        : 'text-ink-dim hover:bg-violet-500/10'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="border-t border-violet-500/10 mt-2 pt-2">
                {user ? (
                  <>
                    <div className="flex items-center gap-2 px-4 py-2 text-sm text-white font-medium">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-xs font-bold">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      {user.name}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-base font-medium text-red-400 rounded-xl hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/join-us" className="btn-ghost justify-center mb-2">
                      Join Us
                    </Link>
                    <Link to="/login" className="btn-primary justify-center">
                      Login
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
