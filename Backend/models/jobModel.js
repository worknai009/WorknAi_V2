import mongoose from 'mongoose';

const jobSchema = mongoose.Schema(
  {
    title:       { type: String, required: true },
    slug:        { type: String, unique: true },
    description: { type: String, default: '' },
    location:    { type: String, default: 'Pune' },
    type:        { type: String, enum: ['full-time', 'part-time', 'internship', 'freelance'], default: 'full-time' },
    experience:  { type: String, default: '' },
    salary:      { type: String, default: '' },
    skills:      [{ type: String }],
    isActive:    { type: Boolean, default: true },
    postedBy:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', jobSchema);
export default Job;
