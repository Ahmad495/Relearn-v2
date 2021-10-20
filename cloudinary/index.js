const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage1 = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'relearn',
        allowedFormats: ['jpeg', 'png', 'jpg', 'svg']
    }
});

const storage2 = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'relearn/videos',
        allowedFormats: ['mp4', 'mkv'],
        resource_type: 'auto'
    }
});

module.exports = {
    cloudinary,
    storage1,
    storage2
}