/* eslint-disable linebreak-style */
const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('shows');
    response.json(users);
});


// 4.15: watchlist expansion, step3

// 4.15: watchlist expansion, step3
// Implement a way to create new users by doing an HTTP POST
// request to address api/users. Users have a username, password and name.




usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body;
    // 4.16*: watchlist expansion, step4
    // Add a feature which adds the following restrictions to creating new users: Both username and password must be given. Both username a
    // nd password must be at least 3 characters long. The username must be unique.
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return response.status(400).json({
            error: 'username must be unique'
        });
    }

    if (username.length < 3) {
        return response.status(400).json({
            error: 'username must be at least 3 characters'
        });
    }
    if (password.length < 3) {
        return response.status(400).json({
            error: 'password must be at least 3 characters'
        });
    }


    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
});

module.exports = usersRouter;