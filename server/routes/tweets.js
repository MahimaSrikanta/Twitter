const express = require('express');
const  Twitter = require('twitter');
const watsonNLU = require('watson-developer-cloud/natural-language-understanding/v1.js');
const config = require('../config/Auth');

const router = express.Router();
const Client = new Twitter(config.Twitter);
const nlu = new watsonNLU(config.NLU);


let tweetsList;
const buildQueryString = (hashTag) => {
  return hashTag.split(",").join('+OR+');
}

const queryWatsonNLUHelper = (tweet) => {
  console.log(tweet);
  const parameters = {
    text: tweet,
    features: {
      emotion:{
        document:true
      }
    }
  };
  return new Promise((resolve, reject)=> {
    nlu.analyze(parameters, function(err, res) {
      if (err) {
        reject(err)
        return;
      }
      resolve(res.emotion.document.emotion);
    });
  })
  .catch(function(err){
    //return error;
    return err;
  });
};


router.get('/tweets', function(req, res, next) {
  const QUERY_STRING = buildQueryString(req.query.hashTag1);
  Client.get('search/tweets', {q:`${QUERY_STRING}`, count:Number(req.query.count)})
    .then(tweets => {
      tweetsList = tweets.statuses;
      res.json({tweets});
    })
    .catch(error => {
      res.json({error})
    })
});


router.get('/sentiments', function(req, res, next) {
  Promise.all(tweetsList.map(tweet => {
    return queryWatsonNLUHelper(tweet.text)
  }))
    .then(data => {
      console.log(data)
      res.json({data})
    })
    .catch(err => {
      console.log(err);
      res.json({err})
    })

});

module.exports = router;