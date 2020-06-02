import React from "react";

interface Props {
  text: string;
}

const CoinResult: React.FC<Props> = ({ text }) => {
  return <h2 className={text ? "appear" : ""}>{text}</h2>;
};

export default CoinResult;
