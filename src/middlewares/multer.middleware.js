// src/middleware/multer.js
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// 🔐 Configure Cloudinary credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📦 Create a Cloudinary storage instance
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'uploads', // cloud folder name
            resource_type: file.mimetype.startsWith('video') ? 'video' : 'image',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mpeg'],
            public_id: file.originalname.split('.')[0], // optional
        };
    },
});

const upload = multer({ storage });

export default upload;
