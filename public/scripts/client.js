/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

//Creating an article for the tweets
const createTweetElement = function(tweetData){
    let $date = new Date(tweetData.created_at);
    const $days = Math.floor($date / (20*60*60*1000));
    const $tweet =(`<article class="tweet">` + 
             `<header>` + 
             `<p>` + 
             `<img src="${tweetData.user.avatars}">` + 
             `${tweetData.user.name}</p>` +
             `<h6>${tweetData.user.handle}</h6>` +
             `</header>` +
             `<p>${tweetData.content.text}</p>` +
             `<footer>` +
             `<h6>${$days} days ago</h6>` +
             `<div>` +
             `<i class="fas fa-flag"></i>`    +
             `<i class="fas fa-retweet"></i>` +
             `<i class="fas fa-heart"></i>` +
             `</div>` + 
             `</footer>` + 
             `</article>`);

    return $tweet;
}
//looping over the dynamic database, using the createTweet 
//for each object and appending those object to the section tag with id: #tweets-container
const renderTweets = function(tweets){
    for(let i = 0; i < tweets.length; i++){
        $tweet = createTweetElement(tweets[i]);
        $('#tweets-container').append($tweet);
    }
}
//Renders function that renders the tweets to the page.
$(document).ready(function() {
    renderTweets(data);
});

