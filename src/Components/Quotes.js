import colorData from "./colorData";
import { useState, useEffect } from "react";
import './index.scss'
const Quotes = (props) => {
  const [getQuote, setGetQuote] = useState([]);
  let [randomQuote, setRandomQuote] = useState("");
  let [author, setAuthor] = useState("");
  const [selectColor, setSelectColor] = useState([]);
  const [loading, setLoading] = useState(true)

  const myStyle = {
    backgroundColor: selectColor,
  };
 
  function fetchQuotes() {
    fetch("https://type.fit/api/quotes/")
      .then((res) => res.json())
      .then((quotes) => {
        setGetQuote(quotes);
        setLoading("")
      });
  }
  useEffect(() => {
    fetchQuotes();
  }, []);

  const randomizeQuote = () => {
    const quoteColor = Math.floor(Math.random() * colorData.length);
    const color = colorData[quoteColor];
    setSelectColor(color);
    document.body.style.backgroundColor = color;

    const random = Math.floor(Math.random() * getQuote.length);
    //const chooseQuote  = getQuote[random].text
    setRandomQuote(getQuote[random].text);
    setAuthor(getQuote[random].author);

    console.log(randomQuote);
  };

  return (
    <div className="container">
      <div className="quote-wrapper" /*key = {index} */>
        <img className="quotation"
          src="/images/quote.png"
          alt="quote-icon"
          style={selectColor && myStyle}
        />
        <p className="quotes" style={{ color: selectColor }}>
          {loading ? "Loading..." : ""}
          
          {randomQuote}
        </p>
        <p className="author" style={{ color: selectColor }}>
          {" "}
          {"-" + author}
        </p>
        <div className="icons-wrapper">
          <div className="icons">
            <a href="https://google.com">
              <img
                className="twitter"
                src="/images/icons8-twitter-squared-50.png"
                alt="twitter"
                style={selectColor && myStyle}
              />
            </a>
            <img
              className="tumblr"
              src="/images/tumblr.png"
              alt="tumblr"
              style={selectColor && myStyle}
            />
          </div>

          <button
            className="new-quote"
            style={selectColor && myStyle}
            onClick={randomizeQuote}
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
