{/* <>
   10hrs used 4 cups of coffee
  increment
</> */}




// config for server mongo db and port .MONGODB_URI prevously defined in config.js imported from envirionment variable MONGODB_URI
const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
require('express-async-errors');
const usersRouter = require('./controllers/users');
// tasks define all routes in app be imported (entry point ,routes)
const loginRouter = require('./controllers/login');
const showsRouter = require('./controllers/show');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose').set('strictQuery', true);
// usinng logger to log all requests insted of console log
logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB');
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message);
    });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);
// app.use(middleware.tokenExtractor);
// entry point routes  from /tasks to shows is where tasks router creates more routes using express route middware function
// use the middleware only in /api/shows routes
// app.use('/api/shows', userExtractor, showsRouter)
app.use('/api/shows', showsRouter);
// 4.15: watchlist expansion, step3
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing');
    app.use('/api/testing', testingRouter);
}
// like prevously deffining error handling in middleware  be last to add to app
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
// gets imported to  index.js entry point which cretes a server to listen on port 3001