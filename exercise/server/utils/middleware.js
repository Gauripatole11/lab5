/* eslint-disable no-unreachable */
const logger = require('./logger');
const jwt = require('jsonwebtoken');

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method);
    logger.info('Path:  ', request.path);
    logger.info('Body:  ', request.body);
    logger.info('---');
    next();
};


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        });
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        });
    }

    next(error);
};

// 4.20*: watchlist expansion, step8

const tokenExtractor = async(request, response, next) => {
    // code that extracts the token
    // console.log("request gotten in  middleare",request);
    const authorization = await  request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const token=authorization.substring(7);
        console.log('token given',token);
        const decodedToken = jwt.verify(token, process.env.SECRET);
        console.log('decoded token',decodedToken);
        // return response.status(200).json( authorization.substring(7) );
    }

    if (!authorization) {
        // console.log("authorisation",request.headers.authorization);
        return  response.status(401) .json('token not provided');
    }
    next('error');

};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
};

