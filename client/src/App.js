import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import TweetForm from './components/TweetForm/TweetForm';
import TweetList from './components/Tweets/TweetList';
import Sentiment from './components/Sentiments/Sentiment';
import {baseUrl} from './utilities/ServerRequest';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      tweets:[],
      error:'',
      sentiments:[]
    }
  }
  
  getHashInput =(hashTag1, hashTag2, count) => {
     axios.get(`${baseUrl}/linqia/tweets`,{
      params: {
        hashTag1: hashTag1,
        hashTag2: hashTag2,
        count : count,
      }})
      .then(data => {
       // console.log(data.data.tweets.statuses)
        this.setState({tweets: data.data.tweets.statuses})
      })
      .catch(err => {
        this.setState({err: err})
      })
  }
  
  getSentiments = () => {
    axios.get(`${baseUrl}/linqia/sentiments`)
      .then(data => {
        this.setState({sentiments: data.data})
      })
      .catch(err => console.log(err))
  }
  
  render() {
    return (
      <div className="container">
        <header className="header">
          <h3 className="logo overview__heading"> LINQIA</h3>
        </header>
        <div className="content">
          <main className="proj-view">
            <div className="overview">
              <h2 className="overview__para"> Twitter </h2>
            </div>
          </main>
        </div>
        <div className="detail">
          <TweetForm
            getHashInput={this.getHashInput}
            getSentiments={this.getSentiments}
          />
        </div>
        <div className="detail">
          {this.state.tweets.length > 0 ?
            <div className="description">
              <Sentiment sentiments={this.state.sentiments}/>
             <TweetList tweetList= {this.state.tweets}/> 
             </div>:
             this.state.error}  
 
        </div>
      </div>
    );
  }
}

export default App;
