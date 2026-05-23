import express from 'express';
import {
  enrollCourse,
  getMyEnrollments,
  checkEnrollment,
  getCourseEnrollments,
  updatePaymentStatus,
  updateApplicationStatus,
} from '../controllers/enrollmentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// User routes
router.post('/', protect, enrollCourse);
router.get('/my', protect, getMyEnrollments);
router.get('/check/:courseId', protect, checkEnrollment);

// HR/Manager/Admin routes
router.get('/', protect, authorize('admin', 'manager', 'hr'), getCourseEnrollments);
router.put('/:id/payment', protect, authorize('admin', 'manager', 'hr'), updatePaymentStatus);
router.put('/:id/status', protect, authorize('admin', 'manager', 'hr'), updateApplicationStatus);

export default router;
