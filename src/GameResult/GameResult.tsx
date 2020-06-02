import React from "react";

interface Props {
  text: string;
}

const GameResult: React.FC<Props> = ({ text }) => {
  return <h3>{text}</h3>;
};
export default GameResult;
