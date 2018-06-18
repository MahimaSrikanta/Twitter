import React, { Component } from 'react';
import './TweetList.css';
import Tweets from './Tweets';
import Sentiments from '../Sentiments/Sentiment';

class TweetList extends Component {
  constructor(props){
    super(props);
    this.state={
      value : '',
      tweetList:this.props.tweetList,
      displaySentiments: false,
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
  
  displaySentiments = () => {
    this.setState({displaySentiments:!this.state.displaySentiments});
  }

  render() {
    const {displaySentiments} = this.state;
    return(
      <div>
       <form className="sort-by">
        <label>Sort By:</label>
        <select value={this.state.value} onChange={this.handleChange}>
          <option name="" value="Select One">Select One</option>
          <option value="favorite_count">Favourite</option>
          <option value="retweet_count">ReTweets</option>
        </select>
        <button type="button" value="Submit" className="btn" onClick={this.displaySentiments}>{displaySentiments ? 'DISPLAY TWEETS': ' DISPLAY SENTIMENTS'}</button>
       </form>
       {displaySentiments ? <Sentiments sentiments={this.props.sentiments}/>:
        this.state.tweetList.map(key => {
        return(
          <Tweets key={key.id}{...key}/>
        );
      })}
      </div>
    )
  }
}

export default TweetList;
