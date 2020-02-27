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
   
  let $article = $('<article class =tweet>');
  let $header = $('<header>');
  let $pImg = $('<p>');
  let $img = $(`<img src=${tweetData.user.avatars}>`);
  let $heading1 = $('<h6>');
  let $pContent = $('<p class="usertext">');
  let $footer = $('<footer>');
  let $heading2 = $('<h6>');
  let $div = $('<div>');
  let $i1 = $('<i class="fas fa-flag"></i>');
  let $i2 = $('<i class="fas fa-retweet"></i>');
  let $i3 = $('<i class="fas fa-heart"></i>');

  $pImg.text(tweetData.user.name);
  $heading1.text(tweetData.user.handle);
  $pContent.text(tweetData.content.text);
  $heading2.text($days);

    $article
    .append($header);
    $header
    .append($pImg);
    $pImg
    .append($img);
    $header
    .append($heading1);
    $article
    .append($pContent);
    $article
    .append($footer);
    $footer
    .append($heading2)
    .append($div);
    $div
    .append($i1)
    .append($i2)
    .append($i3);

  return $article;
};
//sliding the form up and down using icon;
$(".iconbtn").click(function(){
    $(".new-tweet").slideToggle();
});
//looping over the dynamic database, using the createTweet
//for each object and appending those object to the section tag with id: #tweets-container
const renderTweets = function(tweets) {
    //Removes all the child nodes from the parent
    $('#tweets-container').empty();
//looping backwards for the newest post
  for (let i = (tweets.length - 1); i >= 0; i--) {
    $tweet = createTweetElement(tweets[i]);
    $("#tweets-container").append($tweet);
  }
};

$(".tweet-form").on("submit", function(event) {
    event.preventDefault();
    // const formHandler = function(){
  $('.error').empty();
  $('.error').hide();
  const MAXLENGTH = 140;
  let $isTextAreaEmpty = $("textarea").val();

  if (MAXLENGTH < $isTextAreaEmpty.length) {
    $('.error').append('<i class="fas fa-exclamation-triangle"><span>Error: Went Over Board with the amount of letters please reduce it</span><i class="fas fa-exclamation-triangle"></i>');
    $('.error').slideDown("slow");
    return;

  } else if ($isTextAreaEmpty === "") {
    $('.error').append('<i class="fas fa-exclamation-triangle"><span>Error: Text area is empty please type something before posting</span><i class="fas fa-exclamation-triangle"></i>');
    $('.error').slideDown("slow");  
    return;
  }
  
  $.ajax({
    method: "POST",
    url: `${server}/tweets`,
    data: $(".tweet-form").serialize(),
    success: function () {  
        loadTweets();
    }
  });
});

const loadTweets = function() {
    $.ajax({
    method: "GET",
    url: `/tweets`,
    success: function(tweets) {
        renderTweets(tweets)
    }
  });
};
loadTweets();

//Text area function that auto height when presssing enter or overflowing
$('textarea').each(function () {
    this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
  }).on('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });