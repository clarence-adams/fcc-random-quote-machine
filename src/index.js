import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import './index.scss';
import getQuote from './quotes';
import reportWebVitals from './reportWebVitals';
import {useSpring, animated} from 'react-spring'

const Quote = () => {
  var startingQuote = getQuote();

  if (startingQuote.author == null) {
    startingQuote.author = "Anonymous";
  }

  const [text, setText] = useState(startingQuote.text)
  const [author, setAuthor] = useState(startingQuote.author)
  const [showQuote, setShowQuote] = useState(true);
  const fade = useSpring({
    from: {opacity: 1}, 
    to: {opacity: showQuote ? 1 : 0}
  });

  const fetchQuote = () => {
    setShowQuote(val => !val)
    // fetches quote from quote helper function
    var newQuote = getQuote();

    if (newQuote.author == null) {
      newQuote.author = "Anonymous";
    }
    
    // sets the quote state to a new quote
    setTimeout(() => {setText(newQuote.text)
    setAuthor(newQuote.author)}, 750)

    setTimeout(() => {setShowQuote(val => !val)}, 750)
  }
  var icon = <FontAwesomeIcon icon={faTwitter} />
  return (
    <div id="quote-box" class="container-fluid d-flex flex-row justify-content-center align-items-end">
      <header class="align-self-start">
        <h1>Random Quote Machine</h1>
      </header>
      <animated.div id="quote-text" style={fade}>
        <h2 id="text">"{text}"</h2>
        <hr/>
        <h4 id="author">{author}</h4>
      </animated.div>
      <div id="quote-buttons">
        <button type="button" class ="btn btn-primary mx-1" id="new-quote" onClick={fetchQuote}>New Quote</button>
        <a class="btn btn-tweet mx-1" href="twitter.com/intent/tweet" id="tweet-quote" target="_blank" role="button">Tweet {icon}</a>
      </div>
      <footer>
        <p>Quotes are from https://type.fit/api/quotes by SergeyWebPro</p>
      </footer>
    </div>
  );
};

ReactDOM.render(
    <Quote />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

