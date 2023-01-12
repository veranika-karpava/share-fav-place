const { config, uploader } = require("cloudinary").v2;

//for accessing clodinary storage
const cloudinaryConfig = (_req, _res, next) => {
    if (process.env.STORAGE_TYPE == "cloud") {
        config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }
    next();
};

module.exports = { cloudinaryConfig, uploader };