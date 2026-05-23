import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import User from '../models/userModel.js';

dotenv.config();

const users = [
  { name: 'Admin',   email: 'surajkurrey956@gmail.com', password: 'Suraj@2001',  role: 'admin' },
  { name: 'Manager', email: 'manager@worknai.com',       password: 'Manager@123', role: 'manager' },
  { name: 'HR',      email: 'hr@worknai.com',            password: 'Hr@123456',   role: 'hr' },
];

const seedUsers = async () => {
  try {
    await connectDB();
    for (const u of users) {
      const existing = await User.findOne({ email: u.email });
      if (existing) {
        console.log(`Already exists: ${u.email}`);
        continue;
      }
      await User.create({ ...u, password: await bcrypt.hash(u.password, 10) });
      console.log(`Seeded: ${u.email} (${u.role})`);
    }
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();