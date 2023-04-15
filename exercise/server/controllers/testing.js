/* eslint-disable linebreak-style */





const testingRouter = require('express').Router();
const User = require('../models/user');
const Shows = require('../models/show');

testingRouter.post('/reset', async (request, response) => {
    await Shows.deleteMany({});
    await User.deleteMany({});

    response.status(204).end();
});

module.exports = testingRouter;