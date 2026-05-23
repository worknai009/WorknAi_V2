import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // optional for OAuth users
    avatar: { type: String, default: '' },
    oauthProvider: { type: String, default: '' }, // 'google'
    role: {
      type: String,
      enum: ['admin', 'manager', 'hr', 'user'],
      default: 'user',
    },
    resetToken:       { type: String, default: '' },
    resetTokenExpiry: { type: Date,   default: null },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
