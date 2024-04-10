import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NewHomePage.css';
import videoSource from '../assets/1448735-uhd_4096_2160_24fps.mp4'; // Add the correct path to your video file here

const NewHomePage = () => {
  const navigate = useNavigate();

  const handleLookingForItemClick = () => {
    navigate('/lostItemMap');
  };

  const handleFoundAnItemClick = () => {
    navigate('/foundItemNotice');
  };

  return (
    <div className="new-home-page">
      <video autoPlay="autoplay" loop="loop" muted className="video-background">
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <b className="never-lose-again">Never Lose Again With Us</b>
        <div className="we-are-committed">
          We are committed to building a lost free Singapore society
        </div>
        <div className="primary-button" onClick={handleLookingForItemClick}>
          <b className="looking-for-an">Looking For An Item</b>
        </div>
        <div className="primary-button1" onClick={handleFoundAnItemClick}>
          <b className="found-an-item">Found An Item</b>
        </div>
      </div>
    </div>
  );
};

export default NewHomePage;