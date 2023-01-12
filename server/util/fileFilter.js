// for controlling type of file
const fileFilter = (_req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype]; // !! - convert to boolean
    let error = isValid ? null : new Error('Invalid mime type!')
    cb(error, isValid);
};

module.exports = fileFilter;