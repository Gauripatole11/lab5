/* eslint-disable linebreak-style */

// 4.15: watchlist expansion, step3
// Implement a way to create new users by doing an HTTP POST r
// equest to address api/users. Users have a username, password and name.


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,


    },
    name: {
        type: String,
    },
    passwordHash: {
        type: String,

    },

    shows: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Show'
        }
    ],
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;