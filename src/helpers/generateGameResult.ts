import { BetOption } from "./../App.types";

const generateGameResult = (): BetOption => {
  return Math.random() > 0.5 ? "heads" : "tails";
};

export default generateGameResult;
