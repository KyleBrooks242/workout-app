const jwt = require('jsonwebtoken');
const dayjs = require('dayjs')
const apiErrorHandler = require('./errors/apiErrorHandler');

const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"].split(' ')[1];

    if (!token) {
        return next(apiErrorHandler.invalid('A token is required for authentication'));
    }
    try {
        const verifiedToken = jwt.verify(token, config.JWT_TOKEN_KEY);

        //TODO check expiration here and throw error if expired
        const expDate = dayjs(verifiedToken.exp * 1000);
        const currentDate = dayjs();
        if (expDate.isBefore(currentDate)) {
            console.log('Token has expired!');
        }
        console.log(`CUR date: ${currentDate.format('YYYYMMDD_T_HH:mm:ss')}`);
        console.log(`EXP date: ${expDate.format('YYYYMMDD_T_HH:mm:ss')}`);


        req.user = verifiedToken.userId
    } catch (err) {
        return next(apiErrorHandler.invalid('Invalid token!'));
    }
    return next();
};

module.exports = verifyToken;