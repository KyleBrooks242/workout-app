const jwt = require("jsonwebtoken");
const apiErrorHandler = require('../errors/apiErrorHandler');
const ApiError = require('../errors/ApiError')

const config = process.env;

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return next(apiErrorHandler.invalid('A token is required for authentication'));
    }
    try {
        req.user = jwt.verify(token, config.TOKEN_KEY);
    } catch (err) {
        return next(apiErrorHandler.invalid('Invalid token!'));
    }
    return next();
};

module.exports = verifyToken;