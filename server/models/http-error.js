// blueprint for error
class HttpError extends Error {
    constructor(message, errorCode) {
        super(message);//Add a message property
        this.code = errorCode // Adds a code property
    }
}

module.exports = HttpError; // can use outside of this file