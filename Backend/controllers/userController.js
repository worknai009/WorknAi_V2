import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

// Admin sees all users; Manager sees only HR users
export const getUsers = asyncHandler(async (req, res) => {
  const filter = req.user.role === 'manager' ? { role: 'hr' } : {};
  const users = await User.find(filter).select('-password').sort('-createdAt');
  res.json({ data: users });
});

// Admin can create admin/manager/hr; Manager can only create hr
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    res.status(400); throw new Error('All fields are required');
  }
  const allowed = req.user.role === 'admin' ? ['admin', 'manager', 'hr'] : ['hr'];
  if (!allowed.includes(role)) {
    res.status(403); throw new Error(`You cannot create a '${role}' account`);
  }
  const exists = await User.findOne({ email });
  if (exists) { res.status(400); throw new Error('Email already registered'); }
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role });
  res.status(201).json({ data: { _id: user._id, name: user.name, email: user.email, role: user.role } });
});

// Admin only — delete user
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) { res.status(404); throw new Error('User not found'); }
  if (user._id.toString() === req.user._id.toString()) {
    res.status(400); throw new Error('Cannot delete your own account');
  }
  await user.deleteOne();
  res.json({ message: 'User deleted' });
});
