// model of Error
class HttpError extends Error {
    constructor(message, errorCode) {
        // Text-message of error
        super(message);
        // number of code
        this.code = errorCode;
    }
}

module.exports = HttpError;