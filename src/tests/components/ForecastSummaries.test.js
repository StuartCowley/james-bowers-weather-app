import React from "react";
import { render } from "@testing-library/react";
import ForecastSummaries from "../../components/ForecastSummaries";

describe("ForecastSummaries", () => {
  const validProps = {
    forecasts: [
      {
        date: 1111111111111,
        description: "Stub description",
        icon: "800",
        temperature: {
          max: 22,
          min: 12,
        },
      },
      {
        date: 2222222222222,
        description: "Stub description2",
        icon: "211",
        temperature: {
          max: 17,
          min: 10,
        },
      },
      {
        date: 3333333333333,
        description: "Stub description3",
        icon: "602",
        temperature: {
          max: 18,
          min: 11,
        },
      },
      {
        date: 4444444444444,
        description: "Stub description4",
        icon: "781",
        temperature: {
          max: 19,
          min: 12,
        },
      },
      {
        date: 5555555555555,
        description: "Stub description5",
        icon: "721",
        temperature: {
          max: 24,
          min: 13,
        },
      },
    ],
    onForecastSelect: () => {},
  };

  it("renders correctly", () => {
    const { asFragment } = render(
      <ForecastSummaries
        forecasts={validProps.forecasts}
        onForecastSelect={validProps.onForecastSelect}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the correct amount of summaries", () => {
    const { getAllByTestId } = render(
      <ForecastSummaries
        forecasts={validProps.forecasts}
        onForecastSelect={validProps.onForecastSelect}
      />
    );

    expect(getAllByTestId("forecast-summary")).toHaveLength(
      validProps.forecasts.length
    );
  });
});
