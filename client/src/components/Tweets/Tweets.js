import React from 'react';
import './Tweets.css';

const Tweets = (props) => {
  return (
      <figure className="review">
        <blockquote className="review__text">
         {props.text}
        </blockquote>
        <figcaption className="review__user">
          <div className="review__user-box">
            <p className="review__user-name">{props.user.name}</p>
          </div>
          <div className="review__rating">
            <i className="fa fa-heart-o"></i> {props['favorite_count']}
            <i className="fa fa-comments-o"></i> {props['retweet_count']}
          </div>
        </figcaption>
      </figure>
  );   
      }
export default Tweets;