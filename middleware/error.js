const HttpException = require('../util/HttpExceptionError');

function error(error, request, response, next) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    return response.status(status).json({
        error: message
    })
    return;
  }

module.exports =  error;  