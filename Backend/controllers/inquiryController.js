import asyncHandler from 'express-async-handler';
import Inquiry from '../models/inquiryModel.js';

export const createInquiry = asyncHandler(async (req, res) => {
  const { name, company, email, phone, type, message, source } = req.body;
  if (!name || !email || !message) {
    res.status(400); throw new Error('Name, email and message are required');
  }
  const inquiry = await Inquiry.create({ name, company, email, phone, type, message, source });
  res.status(201).json({ data: inquiry });
});

export const getAllInquiries = asyncHandler(async (req, res) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  res.json({ data: inquiries });
});

export const updateInquiryStatus = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);
  if (!inquiry) { res.status(404); throw new Error('Inquiry not found'); }
  inquiry.status = req.body.status || inquiry.status;
  await inquiry.save();
  res.json({ data: inquiry });
});
