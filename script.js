const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const xBtn = document.getElementById("x");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.querySelector(".loader");

// show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// start loader when entering website and finish it after 2s
loading();
setTimeout(complete, 600);

let apiQuotes = [];

// Show New Quote
/**
 * Generates a new random quote and updates the quote display.
 */
function newQuote() {
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Chesk if author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // Check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
}

// Get Quotes From API
async function getQuotes() {
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl); /// response wont be populated until data is fatched
    apiQuotes = await response.json(); // global variable changing value
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

newQuoteBtn.addEventListener("click", newQuote);

// Tweet Quote
function tweetQuote() {
  const xUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(xUrl, "_blank");
}

xBtn.addEventListener("click", tweetQuote);

// On load
getQuotes();
