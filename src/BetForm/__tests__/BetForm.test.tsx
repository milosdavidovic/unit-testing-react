import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BetForm from "../BetForm";

const renderBetForm = () => {
  return render(<BetForm onBet={() => undefined} />);
};

describe("BetForm", () => {
  it("will render all the elements", () => {
    const { getByLabelText, getByRole } = renderBetForm();

    expect(getByLabelText("Bet amount:")).toBeTruthy();
    expect(getByLabelText("Chosen side:")).toBeTruthy();
    expect(getByRole("button", { name: /bet/i })).toBeTruthy();
  });

  it("will show alert message if bet amount is NOT valid and bet button is pressed", () => {
    const { getByRole } = render(<BetForm onBet={() => undefined} />);

    const button = getByRole("button", { name: /bet/i });
    fireEvent.click(button);

    expect(getByRole("alert")).toHaveTextContent("Wrong bet amount");
  });

  it("will NOT show alert message if bet amount is valid and bet button is pressed", () => {
    const { queryByRole, getByLabelText, getByRole } = renderBetForm();

    const betInput = getByLabelText("Bet amount:");
    fireEvent.change(betInput, { target: { value: "100" } });

    const button = getByRole("button", { name: /bet/i });
    fireEvent.click(button);

    expect(queryByRole("alert")).toBeNull();
  });
});
