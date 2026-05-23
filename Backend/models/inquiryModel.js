import mongoose from 'mongoose';

const inquirySchema = mongoose.Schema(
  {
    name:        { type: String, required: true },
    company:     { type: String, default: '' },
    email:       { type: String, required: true },
    phone:       { type: String, default: '' },
    type:        { type: String, default: '' },
    message:     { type: String, required: true },
    source:      { type: String, default: '' },
    status:      { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  },
  { timestamps: true }
);

const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;
