const express = require('express');
const  Twitter = require('twitter');
const config = require('../config/twitterAuth');

const router = express.Router();
const Client = new Twitter(config);


const buildQueryString = (hashTag) => {
  return hashTag.split(",").join('+OR+');
}


router.get('/tweets', function(req, res, next) {
  const QUERY_STRING = buildQueryString(req.query.hashTag1);
  console.log(QUERY_STRING)

  Client.get('search/tweets', {q:`${QUERY_STRING}`, count:Number(req.query.count)})
    .then(tweets => {
      res.json({tweets});
    })
    .catch(error => {
      console.log(error)
      res.json({error})
    })
});


module.exports = router;