import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    title:       { type: String, required: true },
    slug:        { type: String, unique: true },
    description: { type: String, default: '' },
    category:    { type: String, default: '' },
    url:         { type: String, default: '' },
    techStack:   [{ type: String }],
    isActive:    { type: Boolean, default: true },
    postedBy:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
