import React from "react";
import { render } from "@testing-library/react";
import ForecastDetails from "../../components/ForecastDetails";

describe("ForecastDetails", () => {
  const validProps = [
    {
      date: 1111111111111,
      temperature: {
        max: 25,
        min: 17,
      },
      humidity: 20,
      wind: {
        speed: 5,
        direction: "W",
      },
    },
    {
      date: 2222222222222,
      temperature: {
        max: 13,
        min: 5,
      },
      humidity: 80,
      wind: {
        speed: 30,
        direction: "E",
      },
    },
  ];
  function formatDate(date) {
    return new Date(date).toDateString().slice(0, 10);
  }

  it("renders correctly", () => {
    const { asFragment, getByText } = render(
      <ForecastDetails forecast={validProps[0]} />
    );

    expect(asFragment()).toMatchSnapshot();

    expect(getByText(formatDate(validProps[0].date))).toHaveAttribute(
      "class",
      "forecast-details__date"
    );
  });
});
