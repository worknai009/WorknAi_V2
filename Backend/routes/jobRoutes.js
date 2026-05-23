import express from 'express';
import { getJobs, getJobBySlug, getManageJobs, createJob, updateJob, deleteJob } from '../controllers/jobController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getJobs);
router.get('/manage', protect, authorize('admin', 'manager', 'hr'), getManageJobs);
router.get('/:slug', getJobBySlug);
router.post('/', protect, authorize('admin', 'manager', 'hr'), createJob);
router.put('/:id', protect, authorize('admin', 'manager', 'hr'), updateJob);
router.delete('/:id', protect, authorize('admin', 'manager', 'hr'), deleteJob);

export default router;
