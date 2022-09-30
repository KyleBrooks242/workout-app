class ApiError {

    constructor(code, message) {
        this.code = code;
        this.message = { error: message };
    }

    static badRequest(msg) {
        return new ApiError(400, msg);
    }

    static internal(msg) {
        return new ApiError(500, msg);
    }

    static invalid(msg) {
        return new ApiError(401, msg);
    }

    static unauthorized(msg) {
        return new ApiError(403, msg);
    }
}

module.exports = ApiError;
