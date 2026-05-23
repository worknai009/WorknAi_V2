import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import { sendMail } from '../utils/mailer.js';

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

const userResponse = (user, token) => ({
  token,
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar || '',
});

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.password) {
    res.status(401);
    throw new Error('Invalid email or password');
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401);
    throw new Error('Invalid email or password');
  }
  res.json({ data: userResponse(user, generateToken(user._id)) });
});

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide name, email and password');
  }
  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error('Email already registered');
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role: 'user' });
  res.status(201).json({ data: userResponse(user, generateToken(user._id)) });
});

export const googleAuth = asyncHandler(async (req, res) => {
  const { credential } = req.body;
  if (!credential) {
    res.status(400);
    throw new Error('Google credential is required');
  }
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ name, email, avatar: picture, oauthProvider: 'google', role: 'user' });
  } else if (!user.avatar && picture) {
    user.avatar = picture;
    await user.save();
  }

  res.json({ data: userResponse(user, generateToken(user._id)) });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json({ data: user });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) { res.status(400); throw new Error('Email is required'); }

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  // Always send the same response to avoid exposing registered emails
  if (!user) {
    return res.json({ message: 'If this email is registered, a reset link has been sent.' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  user.resetToken = token;
  user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  await user.save();

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const resetUrl = `${frontendUrl}/reset-password?token=${token}`;

  await sendMail({
    to: user.email,
    subject: 'WorknAi — Reset Your Credentials',
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:auto;background:#0d0d1a;color:#e2e8f0;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:32px;text-align:center;">
          <h1 style="margin:0;font-size:28px;color:#fff;letter-spacing:-0.5px;">WorknAi</h1>
          <p style="margin:8px 0 0;color:#c4b5fd;font-size:14px;">Credential Reset Request</p>
        </div>
        <div style="padding:32px;">
          <p style="margin:0 0 16px;color:#94a3b8;">Hi <strong style="color:#fff;">${user.name}</strong>,</p>
          <p style="margin:0 0 24px;color:#94a3b8;line-height:1.6;">
            We received a request to reset your WorknAi account credentials.
            Click the button below to set a new email and/or password.
            This link will expire in <strong style="color:#fff;">1 hour</strong>.
          </p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${resetUrl}" style="background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;text-decoration:none;padding:14px 32px;border-radius:12px;font-weight:600;font-size:15px;display:inline-block;">
              Reset My Credentials
            </a>
          </div>
          <p style="margin:0 0 8px;color:#64748b;font-size:12px;">
            Or copy this link into your browser:
          </p>
          <p style="margin:0;word-break:break-all;color:#818cf8;font-size:12px;">${resetUrl}</p>
          <div style="margin-top:32px;padding-top:24px;border-top:1px solid #1e1b4b;">
            <p style="margin:0;color:#64748b;font-size:12px;">
              If you didn't request this, you can safely ignore this email. Your account is secure.
            </p>
          </div>
        </div>
      </div>
    `,
  });

  res.json({ message: 'If this email is registered, a reset link has been sent.' });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, newEmail, newPassword } = req.body;
  if (!token) { res.status(400); throw new Error('Reset token is required'); }
  if (!newEmail && !newPassword) { res.status(400); throw new Error('Provide a new email or new password'); }

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: new Date() },
  });
  if (!user) { res.status(400); throw new Error('This reset link is invalid or has expired'); }

  if (newEmail) {
    const trimmed = newEmail.toLowerCase().trim();
    if (trimmed !== user.email) {
      const taken = await User.findOne({ email: trimmed });
      if (taken) { res.status(400); throw new Error('This email is already in use by another account'); }
      user.email = trimmed;
    }
  }

  if (newPassword) {
    if (newPassword.length < 6) { res.status(400); throw new Error('Password must be at least 6 characters'); }
    user.password = await bcrypt.hash(newPassword, 10);
  }

  user.resetToken = '';
  user.resetTokenExpiry = null;
  await user.save();

  res.json({ message: 'Credentials updated successfully', role: user.role });
});
