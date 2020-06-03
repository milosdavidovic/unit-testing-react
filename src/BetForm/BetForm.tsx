import React, { useRef, useState } from "react";
import { BetOption } from "../App.types";

interface Props {
  onBet: (bet: BetOption, amount: number) => void;
}

const BetForm: React.FC<Props> = ({ onBet }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const [error, setError] = useState("");

  const handleOnClick = () => {
    if (!inputRef.current || !selectRef.current) {
      return;
    }
    if (+inputRef.current.value < 1) {
      setError("Wrong bet amount");
      return;
    }
    onBet(selectRef.current.value as BetOption, +inputRef.current.value);
  };

  const handleOnChange = () => {
    setError("");
  };

  return (
    <form>
      <label htmlFor="bet-amount">Bet amount:</label>
      <input
        id="bet-amount"
        ref={inputRef}
        name="bet"
        type="number"
        onChange={handleOnChange}
      />
      <label htmlFor="select-side">Chosen side:</label>
      <select id="select-side" ref={selectRef}>
        <option value="heads">Heads</option>
        <option value="tails">Tails</option>
      </select>
      <button type="button" onClick={handleOnClick}>
        BET
      </button>
      {error && <h3 data-testid="bet-error">{error}</h3>}
    </form>
  );
};

export default BetForm;
