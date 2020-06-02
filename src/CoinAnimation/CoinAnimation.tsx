import React from "react";
import { BetOption, Maybe } from "../App.types";

interface Props {
  side: Maybe<BetOption>;
}

const CoinAnimation: React.FC<Props> = ({ side }) => {
  return (
    <div id="coin" className={side || ""}>
      <div className="side-a"></div>
      <div className="side-b"></div>
    </div>
  );
};

export default CoinAnimation;
