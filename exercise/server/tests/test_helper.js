














/* eslint-disable no-const-assign */

const show = require('../models/show');
// const User = require("../models2/users");
// const show = require("../models/show");

const initialTasks = [
    {
        title: 'Burning train',
        genre: 'Romance',
        url: 'https://instagram.com',
        likes: 5
    },
    {
        title: 'Cooling train',
        genre: 'Action',
        url: 'https://facebook.com',
        likes: 10
    }
];

const nonExistingId = async () => {

    const show = new show(
        {
            title: 'Warming train',
            genre: 'action',
            url: 'http://localhost.com',
            likes: 200

        }
    );
    await show.save();
    await show.remove();

    return show._id.toString();
};
const showsInDb = async () => {
    const shows = await show.find({});
    return shows.map(show => show.toJSON());

};
// const usersInDb2 = async () => {
// 	const users = await User.find({});
// 	return users.map(u => u.toJSON());
// };


// 4.14 Watchlist expansions, step2
// Implement functionality for updating the information of an individual show.


const updateShow = async (id, newShow) => {
    const shows = await show.findByIdAndUpdate(id, newShow, { new: true });

    return await shows.toJSON();
};


module.exports = {
    initialTasks, nonExistingId, showsInDb,updateShow,
};