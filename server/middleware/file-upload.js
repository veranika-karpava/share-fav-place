const multer = require('multer');
const { v4: uuid } = require('uuid');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const fileUpload = multer({
    // limits of uploaded data in byte
    limits: 500000,
    // where to store the files
    // diskStorage - gives controll on storing files to disk
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/images');
        }, // the folder to which the file has been saved
        filename: (req, file, cb) => {
            // what extansion should be in file
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, uuid() + '.' + ext);
        }//the name of the file within the destination
    }),
    // Function to control which files are accepted
    fileFilter: (req, file, cb) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype]; // !! - convert to boolean
        let error = isValid ? null : new Error('Invalid mime type!')
        cb(error, isValid);
    }
});

module.exports = fileUpload;