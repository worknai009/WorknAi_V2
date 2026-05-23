import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import { slugify } from '../utils/slugify.js';

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isActive: true })
    .populate('postedBy', 'name role')
    .sort('-createdAt');
  res.json({ data: products });
});

export const getManageProducts = asyncHandler(async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { postedBy: req.user._id };
  const products = await Product.find(filter)
    .populate('postedBy', 'name email role')
    .sort('-createdAt');
  res.json({ data: products });
});

export const createProduct = asyncHandler(async (req, res) => {
  const { title, description, category, url, techStack } = req.body;
  if (!title) { res.status(400); throw new Error('Title is required'); }
  const product = await Product.create({
    title, slug: slugify(title), description, category, url,
    techStack: Array.isArray(techStack) ? techStack : (techStack ? techStack.split(',').map(s => s.trim()) : []),
    postedBy: req.user._id,
  });
  res.status(201).json({ data: product });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error('Product not found'); }
  if (req.user.role !== 'admin' && product.postedBy.toString() !== req.user._id.toString()) {
    res.status(403); throw new Error('Not authorized');
  }
  const fields = ['title', 'description', 'category', 'url', 'isActive'];
  fields.forEach(f => { if (req.body[f] !== undefined) product[f] = req.body[f]; });
  if (req.body.techStack) {
    product.techStack = Array.isArray(req.body.techStack) ? req.body.techStack : req.body.techStack.split(',').map(s => s.trim());
  }
  await product.save();
  res.json({ data: product });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error('Product not found'); }
  if (req.user.role !== 'admin' && product.postedBy.toString() !== req.user._id.toString()) {
    res.status(403); throw new Error('Not authorized');
  }
  await product.deleteOne();
  res.json({ message: 'Product deleted' });
});
