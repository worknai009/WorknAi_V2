import express from 'express';
import { getUsers, createUser, deleteUser } from '../controllers/userController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, authorize('admin', 'manager'), getUsers);
router.post('/', protect, authorize('admin', 'manager'), createUser);
router.delete('/:id', protect, authorize('admin'), deleteUser);

export default router;
