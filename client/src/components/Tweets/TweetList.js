import React, { Component } from 'react';
import './TweetList.css';
import Tweets from './Tweets';

class TweetList extends Component {
  constructor(props){
    super(props);
    this.state={
      value : '',
      tweetList:this.props.tweetList,
    }
  }
  
  componentWillReceiveProps =(newProps) =>{
    this.setState({
      tweetList:newProps.tweetList,
      value:''
    })
  }


  handleSort = () => {
    let {tweetList, value} = this.state;
    tweetList.sort((tweetA,tweetB) => {
      return (tweetA[value] - tweetB[value]);
    })
    this.setState({
      tweetList: tweetList
    });
  }

  handleChange = (event)=>{
    event.preventDefault();
    this.setState({
      value : event.target.value,
    }, () => {
      this.handleSort();
    });
    
  }

  render() {
    return(
      <div className="description">
       <form className="sort-by">
        <label>Sort By:</label>
        <select value={this.state.value} onChange={this.handleChange}>
          <option name="" value="Select One">Select One</option>
          <option value="favorite_count">Favourite</option>
          <option value="retweet_count">Comments</option>
        </select>
       </form>
      { this.state.tweetList.map(key => {
        return(
          <Tweets key={key.id}{...key}/>
        );
      })}
      </div>
    )
  }
}

export default TweetList;
