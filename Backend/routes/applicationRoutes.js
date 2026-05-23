import express from 'express';
import {
  applyForJob,
  getMyApplications,
  getJobApplications,
  getAllApplications,
  updateApplicationStatus,
} from '../controllers/applicationController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { uploadResume } from '../middleware/upload.js';

const router = express.Router();

// User routes
router.post('/', protect, uploadResume.fields([{ name: 'resume', maxCount: 1 }, { name: 'coverLetterFile', maxCount: 1 }]), applyForJob);
router.get('/my', protect, getMyApplications);

// HR/Manager/Admin routes
router.get('/', protect, authorize('admin', 'manager', 'hr'), getAllApplications);
router.get('/job/:jobId', protect, authorize('admin', 'manager', 'hr'), getJobApplications);
router.put('/:id/status', protect, authorize('admin', 'manager', 'hr'), updateApplicationStatus);

export default router;
