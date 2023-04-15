/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import taskService from '../services/shows';
const Reccomendshow = ({ shows,setShows,setErrorMessage,recommendform,setrecommendform,addshows ,recommenderid }) => {
    // const [shows, setShows] = useState([])
    const [newShowTitle, setNewShowTitle] = useState('');
    const [genre, setgenre] = useState('');
    const [url, seturl] = useState('');
    const [likes, setlikes] = useState('');
    const [recommender, setrecommender] = useState(recommenderid);
    // const [showAll, setShowAll] = useState(true)
    // const [errorMessage, setErrorMessage] = useState(null)
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    // const [user, setUser] = useState(null)
    // const [loginvisible, setloginvisible] = useState(true);
    // const [recommendform, setrecommendform] = useState(false)

    const addshow = event => {
        event.preventDefault();
        const taskObject = {
            title: newShowTitle,
            genre: genre,
            url: url,
            likes: likes,
            recommender: recommender,

        };

        taskService
            .create(taskObject)
            .then(returnedTask => {
                setShows(shows.concat(returnedTask));
                setNewShowTitle('');
                setErrorMessage('show was added');
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
                // 5.5 Watchlist frontend, step5
                setrecommendform(!recommendform);
            // eslint-disable-next-line no-unused-vars
            }).catch(error => {
                setErrorMessage(
                    `show '${taskObject.title}' was not added`
                );
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);

            });
    };

    return (
        <div>
            <form onSubmit={addshows} style={{ display:'flex-row',margin:'10px',padding:'10px' }}>
                <input
                    id='showtitle'
                    name='showtitle'
                    required
                    value={newShowTitle}
                    onChange={({ target }) => setNewShowTitle(target.value)}
                />
                <label htmlFor="showtitle">Title</label>
                <input type="text"
                    value={genre}
                    id='genre'
                    name='genre'
                    required
                    onChange={({ target }) => setgenre(target.value)}

                />
                <label htmlFor="genre"> genre</label>
                <input type="text"
                    value={url}
                    name='url'
                    id='url'
                    required
                    onChange={({ target }) => seturl(target.value)}
                />
                <label htmlFor="url">add a show url</label>
                <input type="number" name="likes" id="likes"
                    value={likes}
                    required
                    onChange={({ target }) => setlikes(target.value)}
                />
                <label htmlFor="likes"> Add number of likes</label>
                <input type="text" name="recommender" id="recommender"
                    value={recommender}
                    required
                    onChange={({ target }) => setrecommender(target.value)}
                />
                <label htmlFor="recommender">add a recommender</label>
                <div>
                    <button type="submit">save</button>
                </div>
            </form>


        </div>
    );
};

export default Reccomendshow;
