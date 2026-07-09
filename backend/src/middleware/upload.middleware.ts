import multer from 'multer';
import path from 'path';
import fs from 'fs';

// NOTE on deployment: this stores files on local disk, which works fine in
// development. On Render's free/starter tiers, the filesystem is EPHEMERAL —
// uploaded files disappear on every redeploy or restart. For production,
// swap this out for a Cloudinary/S3 upload instead (same route interface,
// just change what `storage` does). Flagging this now so it's not a surprise
// after your first Render redeploy wipes provider photos.

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

function fileFilter(_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error('Only JPEG, PNG, and WEBP images are allowed'));
  }
  cb(null, true);
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
