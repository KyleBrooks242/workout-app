const jwt = require("jsonwebtoken");
const apiErrorHandler = require('../errors/apiErrorHandler');

const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"].split(' ')[1];

    if (!token) {
        return next(apiErrorHandler.invalid('A token is required for authentication'));
    }
    try {
        const verifiedToken = jwt.verify(token, config.JWT_TOKEN_KEY);
        console.log('VERIFIED TOKEN:')
        console.log(verifiedToken);
        req.user = verifiedToken.userId
    } catch (err) {
        return next(apiErrorHandler.invalid('Invalid token!'));
    }
    return next();
};

module.exports = verifyToken;