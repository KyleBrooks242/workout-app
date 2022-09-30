const ApiError = require('./ApiError');

const ApiErrorHandler = (err, req, res, next) => {
    //In prod, don't use console.log as it is not async
    //Check out winston logging
    console.log(err);
    if (err instanceof ApiError) {
        res.status(err.code).json(err.message);
        return;
    }

    res.status(500).json('Something went wrong!');
}

module.exports = ApiErrorHandler