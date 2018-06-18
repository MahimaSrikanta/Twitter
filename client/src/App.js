import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import TweetForm from './components/TweetForm/TweetForm';
import TweetList from './components/Tweets/TweetList';
import {baseUrl} from './utilities/ServerRequest';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      tweets:[],
      error:'',
      sentiments:[],
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
        console.log(data.data)
        if(data.data.tweets.statuses.length >0) {
          this.setState({tweets: data.data.tweets.statuses});
          this.getSentiments();
        }else{
          throw new Error("No Tweets To Display, Please check the hashtags or try chaining it with other hashtags")
        }
      })
      .catch(err => {
        this.setState({error: err.message});
      })
  }
  
  getSentiments = () => {
    axios.get(`${baseUrl}/linqia/sentiments`)
      .then(data => {
        this.setState({
          sentiments: data.data,

        })
      })
      .catch(err => {
        this.setState({err: err});
      })
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
          />
        </div>
        <div className="detail">
          {this.state.tweets.length > 0 ?
            <div className="description">
             <TweetList 
               tweetList= {this.state.tweets} 
               sentiments={this.state.sentiments}
              /> 
             </div>:
             this.state.error}  
 
        </div>
      </div>
    );
  }
}

export default App;
