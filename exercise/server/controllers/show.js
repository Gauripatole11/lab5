



const showsRouter = require('express').Router();
const Show = require('../models/show');
const User = require('../models/user');
const jwt = require('jsonwebtoken');



showsRouter.get('/', async (request, response) => {
    const shows = await Show
        .find({})
        .populate('recommender');
    response.json(shows);
});

showsRouter.get('/:id', async (request, response) => {
    const show= await Show.findById(request.params.id);
    if (show) {
        response.json(show);
    } else {
        response.status(404).end();
    }
});
const getTokenFrom = request => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }
    return null;
};

showsRouter.post('/', async (request, response) => {
    console.log('post request',request.headers.authorization);
    console.log('ck request values',request.authorization);
    const body = request.body;
    if (!body.title) {
        return response.status(400).json({ error: 'title is required' });

    }
    // const { title,genre,url,likes } = request.body;

    const tokensent= request.headers;
    console.log('tokensent',tokensent);




    const token = getTokenFrom(request);
    console.log('token given',token);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log('decoded token',decodedToken);
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);
    // const user =await User.findById(request.body.recommender);
    console.log('user from token',user);
    // const { title,genre,url,likes } = request.body;
    // 	4.17: watchlist expansion, step5
    // Expand showso that each show contains information on
    // the recommender of that show.

    const show = new Show({
        title:body.title ,
        genre: body.genre ,
        url: body.url,
        likes: body.likes,
        recommender: user._id
    });

    const savedShow = await show.save();
    console.log('saved show',savedShow);
    user.shows = user?.shows.concat(savedShow._id);
    await user.save();

    response.status(201).json(savedShow);
});
// 4.22*: watchlist expansion, step10

showsRouter.delete('/:id', async (request, response,next) => {
    console.log('delete request',request.body);
    const token = getTokenFrom(request);
    console.log('token given',token);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log('decoded token',decodedToken);
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }
    if (decodedToken.id ) {
        console.log('should delete');
        const show = await Show.findById(request.params.id);
        console.log('show is', show?.recommender.toString());
        // const decoded_id=decodedToken.id;
        const recommenders_id=show?.recommender.toString();
        decodedToken.id === recommenders_id && console.log('they same ');
        await Show.findByIdAndRemove(request.params.id);
        response.status(204).end();
    }
    // {
    // 	"title": "kamau kamu",
    // 	"genre": "sgiow",
    // 	"url": "http://bghbkjnhil",
    // 	"likes": 40,
    // 	"recommender": "642bc5714af993870a49a1cd",
    // 	"id": "642bdd2683a31f943a2c6901"
    // }


    // await Show.findByIdAndRemove(request.params.id);
    next('deleted');
});


showsRouter.put('/:id', (request, response, next) => {
    // const body = request.body;
    const { title,genre,url,likes } = request.body;

    const show= {
        title:title ,
        genre: genre ,
        url: url,
        likes: likes
    };

    Show.findByIdAndUpdate(request.params.id, show, { new: true })
        .then(updatedShow => {
            response.json(updatedShow);
        })
        .catch(error => next(error));
});

module.exports = showsRouter;