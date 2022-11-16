const multer = require('multer');
const DatauriParser = require('datauri/parser');
const path = require('path');
const { v4: uuid } = require('uuid');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

let storage;
let dataUri;
const parser = new DatauriParser();

if (process.env.STORAGE_TYPE == 'cloud') {
    // store im virtual storage and save in buffer
    storage = multer.memoryStorage();
    // to parse file from buffer
    dataUri = (req) =>
        parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);
} else {
    dataUri = {};
    // store file in disk storage
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/images'); // path where stored data
        },
        filename: (req, file, cb) => {
            // what extansion should be in file
            const ext = MIME_TYPE_MAP[file.mimetype];
            // name of the file within the destination
            cb(null, uuid() + '.' + ext);
        }
    })
};

// function to control type of file
const fileFilter = (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype]; // !! - convert to boolean
    let error = isValid ? null : new Error('Invalid mime type!')
    cb(error, isValid);
};

const fileUpload = multer({
    // set limit for size of uploaded data in byte
    limits: 500000,
    // storge where file should be stored
    storage: storage,
    // control which files are accepted
    fileFilter: fileFilter
})
    .single('image');

module.exports = { fileUpload, dataUri };

