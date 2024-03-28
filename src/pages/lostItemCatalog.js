import React from "react";
import {useParams} from "react-router-dom";
import axios from 'axios';
import {useEffect, useState} from 'react'; // Used for api calls to server
import 'bootstrap/dist/css/bootstrap.min.css';
import './lostItemCatalog.css';



function LostItemCatalog() {
    let {id} = useParams()
    const [postObject, setPostObject] = useState([]); // [] since API req returns a list setListOfPosts is a function to change the lists of posts
    useEffect(() => {
        axios.get(`http://localhost:5000/posts/byID/${id}`).then((response) => {
            setPostObject(response.data);
        })
    });

    return (
        <div className="postPage">
          <div className="leftSide">
            <div className="post" id="individual">
              <div className="title"> {postObject.title} </div>
              <div className="body">{postObject.postText}</div>
              <div className="footer">{postObject.username}</div>
            </div>
          </div>
          <div className="rightSide">Comment Section</div>
        </div>
      );
}

export default LostItemCatalog;