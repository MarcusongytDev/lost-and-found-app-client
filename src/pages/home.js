import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Home(){
    const [listOfPosts, setListOfPosts] = useState([]); // [] since API req returns a list setListOfPosts is a function to change the lists of posts
    let navigate = useNavigate(); //Allows you to change to another route from your current route using push

    useEffect(()=>{ // Instantiate an anonymous function
        axios.get("http://localhost:5000/lostItemPosts").then((response) => {
            setListOfPosts(response.data); // create a state containing response from the API request, can be used to display the data
        });
    }, []);

    return (
        <div>
            {listOfPosts.map((value, key) => {
                return (
                    <div className="post" onClick={() => {navigate(`/post/${value.id}`)}}> 
                        <div className="title"> {value.title}</div> 
                        <div className="body"> {value.postText}</div>
                        <div className="footer"> {value.username}</div> 
                    </div>
                );
            })} 
        </div>
    );
}

export default Home;