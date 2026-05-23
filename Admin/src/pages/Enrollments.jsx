import { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { BookOpen, Users, IndianRupee, Check, Loader2, ChevronDown, ChevronUp } from 'lucide-react';

const paymentStyle = {
  free:    'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  pending: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  paid:    'bg-green-500/15 text-green-400 border-green-500/30',
};

function EnrollmentRow({ enrollment, onUpdate }) {
  const [saving, setSaving] = useState(false);

  const markPaid = async () => {
    setSaving(true);
    try {
      await api.put(`/enrollments/${enrollment._id}/payment`, { paymentStatus: 'paid' });
      toast.success('Marked as paid');
      onUpdate(enrollment._id, 'paid');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <tr className="border-b border-slate-800/50 hover:bg-slate-800/20">
      <td className="py-3 px-5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0 overflow-hidden">
            {enrollment.user?.avatar ? (
              <img src={enrollment.user.avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              enrollment.user?.name?.charAt(0).toUpperCase()
            )}
          </div>
          <span className="text-slate-200 font-medium">{enrollment.user?.name}</span>
        </div>
      </td>
      <td className="py-3 px-4 text-slate-400">{enrollment.user?.email}</td>
      <td className="py-3 px-4 text-slate-400 text-xs">
        {new Date(enrollment.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
      </td>
      <td className="py-3 px-4 text-slate-300">{enrollment.amount ? `₹${enrollment.amount}` : 'Free'}</td>
      <td className="py-3 px-4">
        <span className={`text-xs font-medium border rounded-full px-2.5 py-0.5 capitalize ${paymentStyle[enrollment.paymentStatus]}`}>
          {enrollment.paymentStatus}
        </span>
      </td>
      <td className="py-3 px-4 text-right">
        {enrollment.paymentStatus === 'pending' && (
          <button
            onClick={markPaid}
            disabled={saving}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/30 text-xs transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 size={11} className="animate-spin" /> : <Check size={11} />}
            Mark Paid
          </button>
        )}
      </td>
    </tr>
  );
}

function CourseCard({ course, enrollments, onUpdatePayment }) {
  const [open, setOpen] = useState(false);
  const totalRevenue = enrollments.filter((e) => e.paymentStatus === 'paid').reduce((s, e) => s + (e.amount || 0), 0);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden">
      <div
        className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
            <BookOpen size={16} className="text-violet-400" />
          </div>
          <div>
            <p className="text-slate-100 font-semibold">{course.title}</p>
            <p className="text-slate-500 text-xs capitalize">{course.level} · {course.mode} · {course.price ? `₹${course.price}` : 'Free'}</p>
            {course.postedBy && <p className="text-slate-600 text-xs">Posted by: {course.postedBy.name}</p>}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-800 rounded-full px-3 py-1">
            <Users size={13} className="text-violet-400" />
            <span className="text-slate-200 text-sm font-medium">{enrollments.length}</span>
            <span className="text-slate-500 text-xs">enrolled</span>
          </div>
          {totalRevenue > 0 && (
            <div className="hidden sm:flex items-center gap-1 text-emerald-400 text-sm font-medium">
              <IndianRupee size={13} />
              {totalRevenue.toLocaleString()}
            </div>
          )}
          {open ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-800">
          {enrollments.length === 0 ? (
            <p className="text-center text-slate-500 text-sm py-6">No enrollments yet</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="text-left py-2.5 px-5">Student</th>
                  <th className="text-left py-2.5 px-4">Email</th>
                  <th className="text-left py-2.5 px-4">Enrolled On</th>
                  <th className="text-left py-2.5 px-4">Amount</th>
                  <th className="text-left py-2.5 px-4">Payment</th>
                  <th className="py-2.5 px-4" />
                </tr>
              </thead>
              <tbody>
                {enrollments.map((e) => (
                  <EnrollmentRow key={e._id} enrollment={e} onUpdate={onUpdatePayment} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default function Enrollments() {
  const [courses, setCourses] = useState([]);
  const [enrollmentsByCourse, setEnrollmentsByCourse] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [coursesRes, enrollRes] = await Promise.all([
          api.get('/courses/manage'),
          api.get('/enrollments'),
        ]);
        setCourses(coursesRes.data.data);
        const grouped = {};
        enrollRes.data.data.forEach((e) => {
          const cid = e.course?._id || e.course;
          if (!grouped[cid]) grouped[cid] = [];
          grouped[cid].push(e);
        });
        setEnrollmentsByCourse(grouped);
      } catch {
        toast.error('Failed to load enrollments');
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  const handleUpdatePayment = (enrollId, newStatus) => {
    setEnrollmentsByCourse((prev) => {
      const next = { ...prev };
      for (const cid in next) {
        next[cid] = next[cid].map((e) =>
          e._id === enrollId ? { ...e, paymentStatus: newStatus } : e
        );
      }
      return next;
    });
  };

  const totalEnrolled = Object.values(enrollmentsByCourse).reduce((s, arr) => s + arr.length, 0);
  const totalRevenue = Object.values(enrollmentsByCourse)
    .flat()
    .filter((e) => e.paymentStatus === 'paid')
    .reduce((s, e) => s + (e.amount || 0), 0);

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Course Enrollments</h1>
          <p className="mt-1 text-slate-400 text-sm">
            {totalEnrolled} student{totalEnrolled !== 1 ? 's' : ''} enrolled across {courses.length} course{courses.length !== 1 ? 's' : ''}
          </p>
        </div>
        {totalRevenue > 0 && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2 flex items-center gap-2 text-emerald-400 font-semibold">
            <IndianRupee size={16} />
            {totalRevenue.toLocaleString()} total revenue
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
          No courses posted yet
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {courses.map((c) => (
            <CourseCard
              key={c._id}
              course={c}
              enrollments={enrollmentsByCourse[c._id] || []}
              onUpdatePayment={handleUpdatePayment}
            />
          ))}
        </div>
      )}
    </section>
  );
}
