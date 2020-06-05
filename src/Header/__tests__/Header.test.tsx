import React from "react";
import { render } from "@testing-library/react";
import Header from "../Header";

describe("Header", () => {
  it("will render text the header text", () => {
    const testText = "test text";
    const { getByText } = render(<Header text={testText} />);

    expect(getByText(testText)).toBeTruthy();
  });
});
