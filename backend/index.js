const axios =require( 'axios');
const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors({
    origin:'*'
}));
const bearer_token = "AAAAAAAAAAAAAAAAAAAAADpHiAEAAAAAJXDrI%2BHPG68hGk3%2BQCnlWs5iQn0%3DyeF9Gt6wvFY2kphG4yHIEJfoTJrTr2wt82IIBhAt2WNefWLifm"

app.get("/search-tweets/:searchQuery", (req, res, next) => {
  // reusable code
  const {searchQuery} = req.params;
  axios.get(`https://api.twitter.com/2/tweets/search/recent/?query=${searchQuery}`,{
    headers: {
      "Authorization": `Bearer ${bearer_token}`
    }
  }).then((twitter_res) => {
      const tweets = twitter_res.data?.data;
      if (!tweets || tweets?.length === 0) res.json([])
      else{
        tweets[tweets.length-1].paginationToken = twitter_res.data.meta.next_token
        res.json(tweets) 
      }
      
  })
})

app.get("/search-tweets/:searchQuery/:paginatedToken", (req, res, next) => {
    const {searchQuery, paginatedToken} = req.params;
    axios.get(`https://api.twitter.com/2/tweets/search/recent/?query=${searchQuery}&pagination_token=${paginatedToken}`,{
      headers: {
        "Authorization": `Bearer ${bearer_token}`
      }
    }).then((twitter_res) => {
        const tweets = twitter_res.data?.data;
        console.log(tweets);
        console.log(!tweets);
        if (!tweets || tweets?.length === 0) res.json([])
        else{
          tweets[tweets.length-1].paginationToken = twitter_res.data.meta.next_token
          res.json(tweets) 
        }
    })
})

app.get("/get-timeline", (req, res, next) => {
    axios.get("https://api.twitter.com/2/users/2244994945/tweets",{
        headers: {
          "Authorization": `Bearer ${bearer_token}`
        }
      }).then((twitter_res) => {
        res.json(twitter_res.data.data) 
      })
    }
)

app.get("/retweets/:tweetId", (req, res, next) => {
    const tweetId = req.params.tweetId
    axios.get(`https://api.twitter.com/2/tweets/${tweetId}/retweeted_by`,{
        headers: {
            "Authorization": `Bearer ${bearer_token}`
        }
    }).then((twitter_res) => {
        res.json(twitter_res.data.data) 
    })


   });

app.get("/retweets/:tweetId", (req, res, next) => {
  const tweetId = req.params.tweetId
  axios.get(`https://api.twitter.com/2/tweets/${tweetId}/liking_users`,{
      headers: {
          "Authorization": `Bearer ${bearer_token}`
      }
  }).then((twitter_res) => {
      res.json(twitter_res.meta.result_count) 
  })
});

app.listen(4000, () => {
 console.log("Server running on port 4000");
});