import React from "react";
import { render } from "@testing-library/react";
import App from "../../components/App";

describe("App", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<App />);
    // const h1Element = screen.getByText(/Manchester, UK/i);
    expect(asFragment).toMatchSnapshot();
  });
});
