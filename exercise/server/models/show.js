


const mongoose = require('mongoose');
// 4.17: watchlist expansion, step5
// Expand showso that each show contains information
//  on the recommender of that show.
const showSchema = new mongoose.Schema({
    title: String,
    genre: String,
    url: String,
    likes: Number,
    recommender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

showSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
module.exports = mongoose.model('Show', showSchema);

// module.exports = mongoose.model("shows", showSchema);