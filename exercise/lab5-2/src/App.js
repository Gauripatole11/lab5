/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react';
import Task from './components/Show';
import taskService from './services/shows';
import Notification from './components/Notification';
import Footer from './components/Footer';
import loginService from './services/login';
import Reccomendshow from './components/Reccomendshow';
import jwt_decode from 'jwt-decode';

// import protoTypes from 'prop-types';


const App = () => {
    const [shows, setShows] = useState([]);


    const [errorMessage, setErrorMessage] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [recommender, setrecommender] = useState();
    const [user, setUser] = useState(null);
    const [loginvisible, setloginvisible] = useState(true);
    const [recommendform, setrecommendform] = useState(false);
    const [updateshow, setupdateshow] = useState(false);
    const [tokensdata, settokensdata] = useState();

    useEffect(() => {
        taskService
            .getAll()
            .then(initialshows => {
                // 5.9: Watchlist frontend, step9
                setShows(initialshows.sort((a, b) => (a.likes > b.likes) ? 1 : -1));
            });
        const loggedinUser = window.localStorage.getItem('UserLoggedin');
        console.log('login token');
        if (loggedinUser) {
            const user = JSON.parse(loggedinUser);
            setUser(user);
            taskService.setToken(user.token);
        }
    }, [updateshow]);
    const logout=() => {
        taskService.setToken('');
        window.localStorage.removeItem('UserLoggedin');
        setUser(null);

    };

    console.log('rendered', shows.length, 'tasks');
    // const addshow = event => {
    //     event.preventDefault()
    //     const taskObject = {
    //         title: newShowTitle,
    //         genre: genre,
    //         url: url,
    //         likes: likes,
    //         recommender: recommender,

    //     }

    //     taskService
    //         .create(taskObject)
    //         .then(returnedTask => {
    //             setShows(shows.concat(returnedTask))
    //             setNewShowTitle('')
    //             setErrorMessage("show was added")
    //             setTimeout(() => {
    //                 setErrorMessage(null)
    //             }, 5000)
    //             // 5.5 Watchlist frontend, step5
    //             setrecommendform(!recommendform)
    //         }).catch(error => {
    //             setErrorMessage(
    //                 `show '${taskObject.title}' was not added`
    //             )
    //             setTimeout(() => {
    //                 setErrorMessage(null)
    //             }, 5000)

    //         })
    // }

    // const handleTaskChange = (event) => {
    //     console.log(event.target.value)
    //     setNewShowTitle(event.target.value)
    // }

    const toggleImportanceOf = id => {
        const task = shows.find(t => t.id === id);
        const changedTask = { ...task, important: !task.important };

        taskService
            .update(id, changedTask)
            .then(returnedTask => {
                setShows(shows.map(t => t.id !== id ? t : returnedTask));
            })
            .catch(error => {
                setErrorMessage(
                    `Task '${task.content}' was already deleted from server`
                );
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
                setShows(shows.filter(t => t.id !== id));
            });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log('logging in with', username, password);
        try {
            const user = await loginService.login({
                username, password,
            });
            console.log(user);
            window.localStorage.setItem('UserLoggedin', JSON.stringify(user));
            taskService.setToken(user.token);
            console.log('user token',user.token);
            settokensdata(user.token);
            const decordedid=jwt_decode(user.token);
            console.log('decordedid',decordedid);
            setrecommender(decordedid.id);

            setUser(user);
            setUsername('');
            setPassword('');
        } catch (exception) {
            setErrorMessage('Wrong credentials');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }

    };



    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit" onClick={() => setloginvisible(false)}>login</button>
        </form>
    );


    return (
        <div>
            <h1>what to watch</h1>
            <Notification message={errorMessage} />
            {!user && loginForm()}
            {
                user &&  <div>{user.name} is logged in  <button onClick={logout}>logout </button>  </div>
            }
            {user && recommendform ? <div>

                {/* 5.6 Watchlist frontend, step6 */}
                <Reccomendshow shows={shows} setShows={setShows} setErrorMessage={setErrorMessage} recommendform={recommendform} setrecommendform={setrecommendform} recommenderid={recommender} />
            </div> : <div>
                <div>
                    {/* 5.5 Watchlist frontend, step5 */}
                    <button onClick={() => setrecommendform(!recommendform)}>
                        recommend new show
                    </button>
                </div>


            </div>
            }


            {/* <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div> */}
            <ul>
                {shows.map((show,idx) =>
                    <Task
                        key={show.id}
                        show={show}
                        setshow={setShows}
                        shows={shows}
                        index={idx}
                        updateshow={updateshow}
                        setupdateshow={setupdateshow}
                        seterrormessage={setErrorMessage}
                        recommenderid={recommender}

                        toggleImportance={() => toggleImportanceOf(show.id)}
                    />
                )}
            </ul>
            <Footer />
        </div>
    );
};

export default App;
