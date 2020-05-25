import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [result, setResult] = useState("");

  const handleOnClick = () => {
    const flipResult = Math.random();
    setResult("");
    setTimeout(() => {
      if (flipResult > 0.5) {
        setResult("tails");
      } else {
        setResult("heads");
      }
    }, 100);
  };

  return (
    <>
      <h1>Click on coin to flip</h1>
      <div id="coin" className={result} onClick={handleOnClick}>
        <div className="side-a"></div>
        <div className="side-b"></div>
      </div>
      {result && <h2 className={result}>{result}</h2>}
    </>
  );
};

export default App;
