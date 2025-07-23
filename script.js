
const quotes = [
  "Believe in yourself and all that you are.",
  "Push harder than yesterday if you want a different tomorrow.",
  "Success is not final, failure is not fatal.",
  "Small steps every day lead to big results.",
  "Dream it. Wish it. Do it.",
  "Don’t watch the clock; do what it does. Keep going.",
  "You are capable of amazing things.",
  "Time flies but remember you're the pilot.",
  "Delay does not mean denial.",
  "For more or website like this contact +2349060245012"
];

function generateQuote() {
  const quoteBox = document.getElementById("quote");
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteBox.textContent = randomQuote;
}
