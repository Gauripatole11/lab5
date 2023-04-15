/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';



import services from '../services/shows';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';


const Task = ({ show,setShows,shows,index,updateshow,setupdateshow,seterrormessage,handleLike , recommenderid }) => {
    console.log(recommenderid,show);
    // console.log('index',index);

    // const label = task.important
    //     ? 'make not important' : 'make important'

    const [view, setview] = useState(false);
    const [likes, setlikes] = useState(show.likes);
    // const [userlogged, setuserlogged] = useState();


    // const userdata =() => {
    //     const userloggeddata=localStorage.getItem('UserLoggedin');
    //     console.log(userloggeddata);
    //     const userloggeddatajson=JSON.parse(userloggeddata);
    //     console.log(userloggeddatajson.token);
    //     const decodedtoken =jwt_decode(userloggeddatajson.token);
    //     console.log(decodedtoken);
    //     setuserlogged(decodedtoken.id);
    // };




    console.log('likes',likes);
    const like=() => {
        const newlikes=likes+1;
        const data={
            title:show.title,
            genre:show.genre,
            url:show.url,
            likes:newlikes
        };
        services.update(show.id,data).then((res) => {
            console.log('resss',res);
            setlikes(res.likes);
            shows[index]=res;
            // console.log('index of show',shows[index]);
            // setupdateshow(!updateshow)

        }).catch((error) => {
            console.log('error',error);

        });

    };


    // 5.10: Watchlist frontend, step10
    const deleteshow=() => {

        if(window.confirm('are you sure to delete this show?')){


            services.deletebyid(show.id).then((res) => {
                console.log('resss',res);
                // yap
                const arradat=shows.filter((myshow) => myshow.id!==show.id);
                console.log('new data',arradat);
                shows=arradat;
                // setShows(shows);
                setupdateshow(!updateshow);
                // window.location.reload();

                setTimeout(() => {
                    seterrormessage('SHOW WAS DELETED');
                    // window.location.reload();

                }, 1000);

            }).catch((error) => {
                console.log('error',error);

                setTimeout(() => {
                    // window.location.reload();
                    // seterrormessage('cant delete this show');

                }, 1000);
                setTimeout(() => {
                    // window.location.reload();
                    seterrormessage('cant delete this show');

                }, 2000);

            });
        }
    // setupdateshow(!updateshow)
    };
    const showStyle = {
        padding: 10,
        border: 'dotted',
        borderWidth: 4,
        borderColor: 'goldenrod',
        marginTop: 15,
        fontFamily: 'monospace'

    };
    useEffect(() => {
        // userdata();

    },[likes]);

    return (
        <li style={showStyle} className='show'>
            <div>
                <h3>{show.title}</h3>
                <p> {show.genre}</p>
                {/* <p>{show.recommender}</p> */}
                {view && <>

                    <h5>{show.url}</h5>
                    <div> <p>{likes}</p> <button onClick={handleLike||like}  > update</button> </div>


                </>

                }
                <button onClick={() => setview(!view)}> {view ? <h6>close</h6>:<h6>view </h6> }</button>


            </div>


            {/* <button onClick={toggleImportance}>{label}</button> */}
            <div>
                { show.recommender === recommenderid &&
                    <button onClick={deleteshow}>delete show</button>

                }

            </div>
        </li>

    );
};

export default Task;

Task.propTypes = {
    show: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        genre: PropTypes.string,
        url: PropTypes.string,
        likes: PropTypes.number
    }),
    setShows: PropTypes.func,
    shows: PropTypes.array,
    index: PropTypes.number,
    updateshow: PropTypes.bool,
    setupdateshow: PropTypes.func,
    seterrormessage: PropTypes.func,

};