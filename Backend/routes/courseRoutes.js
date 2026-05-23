import express from 'express';
import {
  getCourses,
  getCourseBySlug,
  getCourseContent,
  getManageCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCourses);
router.get('/manage', protect, authorize('admin', 'manager', 'hr'), getManageCourses);
router.get('/:slug/content', protect, getCourseContent);
router.get('/:slug', getCourseBySlug);
router.post('/', protect, authorize('admin', 'manager', 'hr'), createCourse);
router.put('/:id', protect, authorize('admin', 'manager', 'hr'), updateCourse);
router.delete('/:id', protect, authorize('admin', 'manager', 'hr'), deleteCourse);

export default router;
