import React from "react";
import App from "../App";
import { render, act, wait } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import generateGameResult from "../helpers/generateGameResult";
import { createTransaction } from "../service/api";

jest.mock("../helpers/generateGameResult");
const mockGenerateGameResult = generateGameResult as jest.Mock;
jest.mock("../service/api");
const mockCreateTransaction = createTransaction as jest.Mock;
mockCreateTransaction.mockResolvedValue({ data: { success: true } });

afterEach(() => {
  jest.clearAllMocks();
});

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

const renderGame = (selectedSide: string, selectedAmount: number) => {
  const renderResult = render(<App />);
  const { getByLabelText, getByRole } = renderResult;

  const betInput = getByLabelText("Bet amount:");
  userEvent.type(betInput, selectedAmount.toString());

  const betSelect = getByLabelText("Chosen side:");
  userEvent.selectOptions(betSelect, selectedSide);

  const button = getByRole("button", { name: /bet/i });
  userEvent.click(button);

  return renderResult;
};

describe("App", () => {
  it("will render 'HEADS' if game result is heads", async () => {
    mockGenerateGameResult.mockImplementationOnce(() => "heads");

    const { getByTestId } = renderGame("heads", 100);

    act(() => {
      jest.runAllTimers();
    });

    await wait(() =>
      expect(getByTestId("game-result")).toHaveTextContent(/heads/i)
    );
  });

  it("will render 'TAILS' if game result is tails", async () => {
    mockGenerateGameResult.mockImplementationOnce(() => "tails");

    const { getByTestId } = renderGame("heads", 100);

    act(() => {
      jest.runAllTimers();
    });

    await wait(() =>
      expect(getByTestId("game-result")).toHaveTextContent(/tails/i)
    );
  });

  it("will render correct message if user has won", async () => {
    mockGenerateGameResult.mockImplementationOnce(() => "heads");

    const { getByText } = renderGame("heads", 100);

    act(() => {
      jest.runAllTimers();
    });

    await wait(() => expect(getByText("You won $200")).toBeTruthy());
  });

  it("will render correct message if user has lost", async () => {
    mockGenerateGameResult.mockImplementationOnce(() => "tails");

    const { getByText } = renderGame("heads", 100);

    act(() => {
      jest.runAllTimers();
    });

    await wait(() => expect(getByText("You lost $100")).toBeTruthy());
  });

  it("will call createTransaction with the right amount if user wins", async () => {
    mockGenerateGameResult.mockImplementationOnce(() => "heads");

    renderGame("heads", 100);

    act(() => {
      jest.runAllTimers();
    });

    await wait(() => {
      expect(mockCreateTransaction).toHaveBeenCalledTimes(1);
      expect(mockCreateTransaction).toBeCalledWith(200);
    });
  });

  it("will call createTransaction with the right amount if user loses", async () => {
    mockGenerateGameResult.mockImplementationOnce(() => "tails");

    renderGame("heads", 100);

    act(() => {
      jest.runAllTimers();
    });

    await wait(() => {
      expect(mockCreateTransaction).toHaveBeenCalledTimes(1);
      expect(mockCreateTransaction).toBeCalledWith(-100);
    });
  });
});
