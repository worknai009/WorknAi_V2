import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ScrollToTop from './components/ui/ScrollToTop';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import HRLayout from './components/hr/HRLayout';

// Public pages
import Home from './pages/public/Home';
import Courses from './pages/public/Courses';
import CourseDetail from './pages/public/CourseDetail';
import Products from './pages/public/Products';
import Career from './pages/public/Career';
import JobDetail from './pages/public/JobDetail';
import Partners from './pages/public/Partners';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import NotFound from './pages/public/NotFound';
import ServicePage from './pages/public/ServicePage';
import JoinUs from './pages/public/JoinUs';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import ForgotPassword from './pages/public/ForgotPassword';
import ResetPassword from './pages/public/ResetPassword';
import UserDashboard from './pages/public/UserDashboard';
import CourseContent from './pages/public/CourseContent';

// HR pages
import HRLogin from './pages/hr/Login';
import HRDashboard from './pages/hr/Dashboard';
import HRManageCourses from './pages/hr/ManageCourses';
import HRManageJobs from './pages/hr/ManageJobs';
import HRApplications from './pages/hr/Applications';
import HREnrollments from './pages/hr/Enrollments';
import HRProfile from './pages/hr/Profile';

const HRProtected = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (!user || user.role !== 'hr') return <Navigate to="/hr/login" state={{ from: location }} replace />;
  return children;
};

const UserProtected = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};

export default function App() {
  return (
    <>
      <ScrollToTop />
      <div className="cosmos-stars" />
      <div className="grain-overlay" />
      <Routes>
        {/* ============ PUBLIC ============ */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/courses/:slug/content" element={<UserProtected><CourseContent /></UserProtected>} />
          <Route path="/products" element={<Products />} />
          <Route path="/career" element={<Career />} />
          <Route path="/career/:slug" element={<JobDetail />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/join-us" element={<JoinUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* User protected routes */}
          <Route
            path="/user/dashboard"
            element={<UserProtected><UserDashboard /></UserProtected>}
          />
          <Route
            path="/user/my-courses"
            element={<UserProtected><UserDashboard /></UserProtected>}
          />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ============ HR PANEL ============ */}
        <Route path="/hr/login" element={<HRLogin />} />
        <Route
          path="/hr"
          element={<HRProtected><HRLayout /></HRProtected>}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<HRDashboard />} />
          <Route path="courses" element={<HRManageCourses />} />
          <Route path="jobs" element={<HRManageJobs />} />
          <Route path="applications" element={<HRApplications />} />
          <Route path="enrollments" element={<HREnrollments />} />
          <Route path="profile" element={<HRProfile />} />
        </Route>
      </Routes>
    </>
  );
}
