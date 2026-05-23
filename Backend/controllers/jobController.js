import asyncHandler from 'express-async-handler';
import Job from '../models/jobModel.js';
import { slugify } from '../utils/slugify.js';

export const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ isActive: true })
    .populate('postedBy', 'name role')
    .sort('-createdAt');
  res.json({ data: jobs });
});

export const getJobBySlug = asyncHandler(async (req, res) => {
  const job = await Job.findOne({ slug: req.params.slug, isActive: true }).populate('postedBy', 'name role');
  if (!job) { res.status(404); throw new Error('Job not found'); }
  res.json({ data: job });
});

export const getManageJobs = asyncHandler(async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { postedBy: req.user._id };
  const jobs = await Job.find(filter)
    .populate('postedBy', 'name email role')
    .sort('-createdAt');
  res.json({ data: jobs });
});

export const createJob = asyncHandler(async (req, res) => {
  const { title, description, location, type, experience, salary, skills } = req.body;
  if (!title) { res.status(400); throw new Error('Title is required'); }
  const job = await Job.create({
    title, slug: slugify(title), description, location, type,
    experience, salary,
    skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map(s => s.trim()) : []),
    postedBy: req.user._id,
  });
  res.status(201).json({ data: job });
});

export const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) { res.status(404); throw new Error('Job not found'); }
  if (req.user.role !== 'admin' && job.postedBy.toString() !== req.user._id.toString()) {
    res.status(403); throw new Error('Not authorized');
  }
  const fields = ['title', 'description', 'location', 'type', 'experience', 'salary', 'isActive'];
  fields.forEach(f => { if (req.body[f] !== undefined) job[f] = req.body[f]; });
  if (req.body.skills) {
    job.skills = Array.isArray(req.body.skills) ? req.body.skills : req.body.skills.split(',').map(s => s.trim());
  }
  await job.save();
  res.json({ data: job });
});

export const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) { res.status(404); throw new Error('Job not found'); }
  if (req.user.role !== 'admin' && job.postedBy.toString() !== req.user._id.toString()) {
    res.status(403); throw new Error('Not authorized');
  }
  await job.deleteOne();
  res.json({ message: 'Job deleted' });
});
