import React, { useState, useEffect, useRef } from "react";
import { Maybe, BetOption, UserBet } from "./App.types";
import "./App.css";
import Header from "./Header/Header";
import CoinAnimation from "./CoinAnimation/CoinAnimation";
import CoinResult from "./CoinResult/CoinResult";
import BetForm from "./BetForm/BetForm";
import GameResult from "./GameResult/GameResult";
import { createTransaction } from "./service/api";

const WIN_MULTIPLIER = 2;

const App = () => {
  const [result, setResult] = useState<Maybe<BetOption>>(null);
  const [message, setMessage] = useState("");
  const betRef = useRef<UserBet>();

  const resetStateForNewRound = () => {
    setResult(null);
    setMessage("");
  };

  const handleOnClick = (bet: BetOption, amount: number) => {
    betRef.current = { amount, bet };
    resetStateForNewRound();
    setTimeout(() => {
      if (Math.random() > 0.5) {
        setResult("heads");
        return;
      }
      setResult("tails");
    }, 10);
    console.log(result);
  };

  useEffect(() => {
    const handleResult = () => {
      // Delay result until animation finish
      setTimeout(() => {
        if (!result || !betRef.current) return;
        const { bet, amount } = betRef.current;
        if (result === bet) {
          setMessage(`You won $${WIN_MULTIPLIER * amount}`);
          createTransaction(WIN_MULTIPLIER * amount);
          return;
        }
        setMessage(`You lost $${amount}`);
        createTransaction(-amount);
      }, 2000);
    };
    handleResult();
  }, [result]);

  return (
    <>
      <Header text="Toss a coin" />
      <CoinAnimation side={result} />
      <CoinResult text={result || ""} />
      <BetForm onBet={handleOnClick} />
      <GameResult text={message} />
    </>
  );
};

export default App;
