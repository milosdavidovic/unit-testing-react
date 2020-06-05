import React from "react";
import CoinResult from "../CoinResult";
import { render } from "@testing-library/react";

describe("CoinResult", () => {
  it("will render the result text", () => {
    const testText = "test text";
    const { getByTestId } = render(<CoinResult text={testText} />);

    expect(getByTestId("game-result")).toHaveTextContent(testText);
  });
});
