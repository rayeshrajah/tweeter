/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const server = "http://localhost:8080";

//Creating an article for the tweets
const createTweetElement = function(tweetData) {
  let $date = new Date(tweetData.created_at);
  const $days = Math.floor($date / (20 * 60 * 60 * 1000));
  const $tweet =
    `<article class="tweet">` +
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
    `<i class="fas fa-flag"></i>` +
    `<i class="fas fa-retweet"></i>` +
    `<i class="fas fa-heart"></i>` +
    `</div>` +
    `</footer>` +
    `</article>`;

  return $tweet;
};
//looping over the dynamic database, using the createTweet
//for each object and appending those object to the section tag with id: #tweets-container
const renderTweets = function(tweets) {
  for (let i = 0; i < tweets.length; i++) {
    $tweet = createTweetElement(tweets[i]);
    $("#tweets-container").append($tweet);
  }
};

$(".tweet-form").on("submit", function(event) {
  // const formHandler = function(){
  const MAXLENGTH = 140;
  let $isTextAreaEmpty = $("textarea").val();

  if (MAXLENGTH <= $("textarea").val().length) {
    alert("You cannot tweet because you went over the amount of letters!");
    return;
  } else if ($isTextAreaEmpty === "") {
    alert("You have entered nothing");
    return;
  }
  event.preventDefault();
  $.ajax({
    method: "POST",
    url: `${server}/tweets`,
    data: $(".tweet-form").serialize()
  });
});

const loadTweets = function() {
    $.ajax({
    method: "GET",
    url: `/tweets`,
    success: renderTweets
  });
};

loadTweets();

//Renders function that renders the tweets to the page.
//renderTweets(data);
