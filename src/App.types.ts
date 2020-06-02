export type BetOption = "heads" | "tails";
export type Maybe<T> = T | null;
export interface UserBet {
  amount: number;
  bet: BetOption;
}
