var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://cors-anywhere.herokuapp.com/https://quotesondesign.com/wp-json/wp/v2/posts?orderby=rand&posts_per_page=1";


function getQuote() {
    fetch(quoteUrl, { cache: "no-store" })
        .then(function(resp) {
            return resp.json();
        })
        .then(createTweet);
}

function createTweet(input) {
    min = 0;
    max = input.length;
    var data = input[Math.floor(Math.random() * (+max - +min)) + +min];

    var dataElement = document.createElement('div');
    dataElement.innerHTML = data.content.rendered;
    var quoteText = dataElement.innerText.trim();
    var quoteAuthor = data.title;

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }
  
    var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
  
    if (tweetText.length > 1400) {
        getQuote();
    } else {
        var tweet = tweetLink + encodeURIComponent(tweetText);
        document.querySelector('.quote').innerText = quoteText;
          document.querySelector('.author').innerText = "Author: " + quoteAuthor;
          document.querySelector('.tweet').setAttribute('href', tweet);
    }

    document.querySelector('.tweet').setAttribute('href', tweet);
  
}

document.addEventListener('DOMContentLoaded', function() {
    getQuote();
    document.querySelector('.trigger').addEventListener('click', function() {
        getQuote();
    });
});