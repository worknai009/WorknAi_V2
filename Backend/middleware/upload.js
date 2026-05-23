import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const resumeDir = path.join(__dirname, '../uploads/resumes');
const coverLetterDir = path.join(__dirname, '../uploads/coverletters');
if (!fs.existsSync(resumeDir)) fs.mkdirSync(resumeDir, { recursive: true });
if (!fs.existsSync(coverLetterDir)) fs.mkdirSync(coverLetterDir, { recursive: true });

const applicationStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'coverLetterFile') cb(null, coverLetterDir);
    else cb(null, resumeDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const prefix = file.fieldname === 'coverLetterFile' ? 'cl' : 'resume';
    cb(null, `${prefix}_${req.user._id}_${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) cb(null, true);
  else cb(new Error('Only PDF, DOC, DOCX files are allowed'));
};

export const uploadResume = multer({
  storage: applicationStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
