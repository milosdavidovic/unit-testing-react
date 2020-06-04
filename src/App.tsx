import React, { useState, useEffect, useRef } from "react";
import { Maybe, BetOption, UserBet } from "./App.types";
import "./App.css";
import Header from "./Header/Header";
import CoinAnimation from "./CoinAnimation/CoinAnimation";
import CoinResult from "./CoinResult/CoinResult";
import BetForm from "./BetForm/BetForm";
import GameResult from "./GameResult/GameResult";
import { createTransaction } from "./service/api";
import generateGameResult from "./helpers/generateGameResult";

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
      if (generateGameResult() === "heads") {
        setResult("heads");
        return;
      }
      setResult("tails");
    }, 10);
  };

  useEffect(() => {
    const handleResult = () => {
      // Delay result until animation finish
      setTimeout(() => {
        if (!result || !betRef.current) return;
        const { bet, amount } = betRef.current;
        if (result === bet) {
          const winAmount = WIN_MULTIPLIER * amount;
          createTransaction(winAmount).then(() => {
            setMessage(`You won $${winAmount}`);
          });
          return;
        }
        createTransaction(-amount).then(() => {
          setMessage(`You lost $${amount}`);
        });
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
