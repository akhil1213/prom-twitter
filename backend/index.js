const axios =require( 'axios');
const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors({
    origin:'*'
}));
const bearer_token = "AAAAAAAAAAAAAAAAAAAAADpHiAEAAAAAJXDrI%2BHPG68hGk3%2BQCnlWs5iQn0%3DyeF9Gt6wvFY2kphG4yHIEJfoTJrTr2wt82IIBhAt2WNefWLifm"

app.get("/search-tweets/:searchQuery", (req, res, next) => {
    const searchQuery = req.params.searchQuery;
    axios.get(`https://api.twitter.com/2/tweets/search/recent/?query=${searchQuery}`,{
      headers: {
        "Authorization": `Bearer ${bearer_token}`
      }
    }).then((twitter_res) => {
        res.json(twitter_res.data.data) 
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

app.get("/retweets", (req, res, next) => {
    const tweetId = req.body['tweet_id']
    axios.get(`https://api.twitter.com/2/tweets/${tweetId}/retweeted_by`,{
        headers: {
            "Authorization": `Bearer ${bearer_token}`
        }
    }).then((twitter_res) => {
        res.json(twitter_res.data.data) 
    })

    
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);

   });

app.listen(4000, () => {
 console.log("Server running on port 4000");
});