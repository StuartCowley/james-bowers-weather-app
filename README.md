# Weather App 🌦
### Introduction
This project forms part of the final, FrontEnd module at [ManchesterCodes](https://github.com/mcrcodes). The goal is to produce a simple application which takes Weather data from an API and presents it to the user in a web app.

## Contents
- [Languages & Technologies](#Languages--Technologies)
- [Project Setup](#Project-Setup)
- [Components & Scope of Functionalities](#Components--Scope-of-Functionalities)
  - [The App Component](#The-App-Component)
  - [LocationDetails](#LocationDetails)
  - [SearchForm](#SearchForm)
  - [getForecast](#getForecast)
  - [ForecastDetails](#ForecastDetails)
  - [ForecastSummaries & ForecastSummary](#ForecastSummaries--ForecastSummary)
- [Examples of Use](#Examples-of-Use)
- [Project Status](#Project-status)
- [Sources & Credits](#Sources--credits)
<hr>

## Languages & Technologies
### Languages
* JavaScript
* JSX
* HTML
* CSS

### Technologies
* React.JS
* Node.JS
* Jest
<br>

## Project Setup
### Structure
#### index.js
As you would expect, index.js contains only the minimal amount of code required to render the App as a whole - with each component of the app written in its own file, before being imported into app.js, and finally being rendered in the DOM, in index.js. This separation of concerns is particularly important when developing a React app, as it allows you to focus on the core functionality of each component in isolation, and improves readability for anyone working on the app. 

```JavaScript
// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
> Only `React`, `ReactDOM`, and the `App` itself need to be imported to the top-level of the project - with a minimal stylesheet setting out page margins. The root of the DOM is then created and bound to the `root` constant using the imported `ReactDOM.createRoot()` method. `root.render()` is then called to render the App component into the DOM.
<br>

#### App.js
In simple terms, the purpose of ```App.js``` is to import all of the individual app components, and return them in the desired order on the page, with the correct `props` passed into them so that they function as expected - so the entire App itself is a single function:

```JavaScript
// App.js
import "../styles/App.css";
import React, { useEffect, useState } from "react";
import LocationDetails from "./LocationDetails";
import SearchForm from "./SearchForm";
import ForecastSummaries from "./ForecastSummaries";
import ForecastDetails from "./ForecastDetails";
import getForecast from "../requests/getForecast";

function App() {...}

export default App;
```
> The `App` function is exported at the bottom of the file, ready to be rendered as a component in `index.js`.
<br>

## Components & Scope of Functionalities
### The App component
In order to best understand what the App component is doing, the best place to start is at the end of the code, with the return statement - *what is actually being returned by this function?*

```JavaScript
function App() {

  (...)

  return (
    <div className="weather-app">
      <LocationDetails
        city={location.city}
        country={location.country}
        errorMessage={errorMessage}
      />
      <SearchForm
        searchText={searchText}
        setSearchText={setSearchText}
        onSubmit={handleCitySearch}
      />
      {!errorMessage && (
        <>
          {selectedForecast && <ForecastDetails forecast={selectedForecast} />}
          <ForecastSummaries
            forecasts={forecasts}
            onForecastSelect={handleForecastSelect}
          />
        </>
      )}
    </div>
  );
};
```
> The JSX language which *React* apps are written in, means that the return statement can return a mixture of HTML and JavaScript - with the ability to call each `<Component />` in the order that they will appear on the page, and assign `className` values which can be referred to for styling. Each component, or module, can be passed the `props` - properties - required for it to function, using `{JavaScript}` variables. Dot notation can also be used - as with `{location.city}` above, to access the `city` and `country` attributes of the `location` object. Conditional statements are also supported, meaning that the app can be rendered in different ways depending on the *state* of the components - more on that later.
<br>

### LocationDetails
The component in the App which appears first in the return statement's `<div>` is the `LocationDetails` component. This component is responsible for displaying either the current location - broken down into three props: `location.country` and `location.city` - and an `errorMessage` variable which returns an error message if none is found. We'll cover where those values originate from in a moment, but first, let's look at what the LocationDetails component is doing with them:

```JavaScript
function LocationDetails(props) {
  const { city, country, errorMessage } = props;
  return errorMessage ? (
    <h1>{errorMessage}</h1>
  ) : (
    <h1>{`${city}, ${country}`}</h1>
  );
}
```
> `LocationDetails` is itself a function, which has `props` passed to it, as noted previously. The `props` are then destructured into the `city`, `country` and `errorMessage` variables, which are then used in conjunction with a conditional statement to render the component. In this case, if `errorMessage` is not `null`, then the `<h1>` element is rendered with the `errorMessage` as its text. Otherwise, the `<h1>` element is rendered with the `city` and `country` as its text, separated by a comma.
<br>

#### PropTypes Validation
PropTypes is a library which comes bundled with *React* and is used to validate the data types of the props passed into the component. Once imported, PropTypes are defined at the end of the code:

```JavaScript
import React from "react";
import PropTypes from "prop-types";

function LocationDetails(props) {...}

LocationDetails.defaultProps = {
  errorMessage: "",
};

LocationDetails.propTypes = {
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};

export default LocationDetails;
```
> Here, we are expecting the `city` and `country` props to be strings which are **required** for the component to render, and the `errorMessage` prop to also be a string - but this is not required, if the App has a valid location. The `defaultProps` object is also used to set default values for the props, in case they are not passed in. In this case, if all is working well and no error message is passed in, the `errorMessage` prop will be set to an empty string.
<br>

### SearchForm
The next component in the App, and therefore the one which appears just after `<LocationDetails />`, is the `<SearchForm />`:
```JavaScript
// App.js
  return (
    <div className="weather-app">
      <LocationDetails
        city={location.city}
        country={location.country}
        errorMessage={errorMessage}
      />
      <SearchForm
        searchText={searchText}
        setSearchText={setSearchText}
        onSubmit={handleCitySearch}
      />
      ...
    </div>
  );
```
> `<SearchForm />` takes three props: `searchText`, `setSearchText` and `onSubmit` - `onSubmit` is a function which gets called when the submit button is clicked, whereas the `searchText` and `setSearchText` props relate to the **state** of the component.
<br>

#### State
State is a *React* feature which refers to the current *state* of components which deal with user input. State is defined in pairs at the beginning of the module, using the `useState()` hook - where `searchText` is the initial value of the state, and `setSearchText` is the function which updates the state. `onSubmit` is a function which is passed to the component as a prop, and tells the module what to do when the Submit button is pressed. The `useState()` hook itself can be used to define how the default data should be structured, as seen with `const [location, setLocation]`:
```JavaScript
// App.js
function App() {
  const [location, setLocation] = useState({ city: "", country: "" });
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  ...

  return (...);
}
```
To understand further, let's take a look at how these variables are being used by the `<SearchForm />` component:
```JavaScript
// SearchForm.js
function SearchForm({ searchText, setSearchText, onSubmit }) {
  const handleInputChange = (event) => setSearchText(event.target.value);

  return (
    <div className="search-form">
      <input
        type="text"
        onChange={handleInputChange}
        value={searchText}
        className="search-form__input"
      />
      <button
        type="submit"
        onClick={onSubmit}
        data-testid="search-form__button"
        className="search-form__button"
      >
        Search
      </button>
    </div>
  );
}
```
> SearchForm is, again, a function, which has three props: `searchText`, `setSearchText` and `onSubmit`. The `handleInputChange` function is used to update the state of the component when the user types in the search box. The `value` of the input field is assigned the `searchText` variable, and the `onClick` event is assigned the `onSubmit` prop, which in turn, calls the `handleCitySearch()` function defined in App.js.

`handleCitySearch()` behaves similarly to our `useEffect()` hook in that they both call the `getForecast` function, but the difference is that `useEffect()` is called when the component is first rendered, or whenever it is updated - whereas `handleCitySearch()` is only called when the user clicks the submit button, because it is bound to the `onSubmit` variable which is, in turn, assigned to the button's `onClick` property:
```JavaScript
// App.js
function App() {
  ...
  const [searchText, setSearchText] = useState("");
  
  const handleCitySearch = () => {
    getForecast(
      searchText,
      setErrorMessage,
      setSelectedDate,
      setForecasts,
      setLocation
    );
  };

  ...

  useEffect(() => {
    getForecast(
      searchText,
      setErrorMessage,
      setSelectedDate,
      setForecasts,
      setLocation
    );
  }, []);
}
```
<br>

### getForecast
Looking more closely, the getForecast function uses `axios` - a node package which enables us to make HTTP requests to the Weather API - to make requests and retrieve the forecast for the city entered by the user. It does this by taking the `searchText` *state* variable, as well as the four required *state setter* functions, and assigning them to an endpoint variable which equates to the `/forecast` endpoint of the Weather API:
```JavaScript
// getForecast.js
import axios from "axios";

const getForecast = (
  searchText,
  setErrorMessage,
  setSelectedDate,
  setForecasts,
  setLocation
) => {
  let endpoint = "https://mcr-codes-weather.herokuapp.com/forecast";

  ...

export default getForecast;
```

The component takes the `searchText` variable and uses a conditional statement to update the endpoint with the city searched for by the user:
```JavaScript
// getForecast.js
  ...

  if (searchText) {
    endpoint += `?city=${searchText}`;
  }

  return axios
    .get(endpoint)
    .then((response) => {
      setSelectedDate(response.data.forecasts[0].date);
      setForecasts(response.data.forecasts);
      setLocation(response.data.location);
    })
    .catch((error) => {
      const { status } = error.response;
      if (status === 404) {
        setErrorMessage("No such town or city, try again!");
        console.error("Location is not valid", error);
      }
      if (status === 500) {
        setErrorMessage("Oops, server error! Try again later.");
        console.error("Server error", error);
      }
    });
};

export default getForecast;
```
> Once the endpoint has been updated, `.get` is used to make a new request. If this is successful, the `forecasts` data is assigned to `setForecasts`, the `location` is assigned to the `setLocation`, and today's date (which is the first forecast in the array) is assigned to `setSelectedDate`. If the request fails, a new `errorMessage` is assigned to `setErrorMessage` depending on the status resonse, or the outcome of the conditional statement.
<br>

### ForecastDetails
So far, we have mostly looked at the functionality behind our App - most of which is is driven by the `< SearchForm />` component and `getForecast` function. In `getForecast`, we updated the `errorMessage` variable to hold a value if the request was unsuccessful - this binary (yes / no) presence of a message can be used in conjunction with a conditional statement to decide how the App renders:
```JavaScript
  return (
    <div className="weather-app">
      <LocationDetails
        city={location.city}
        country={location.country}
        errorMessage={errorMessage}
      />
      <SearchForm
        searchText={searchText}
        setSearchText={setSearchText}
        onSubmit={handleCitySearch}
      />
      {!errorMessage && (
        <>
          {selectedForecast && <ForecastDetails forecast={selectedForecast} />}
          <ForecastSummaries
            forecasts={forecasts}
            onForecastSelect={handleForecastSelect}
          />
        </>
      )}
    </div>
  );
```
> As shown above, if the `errorMessage` variable does **not** contain any text, and if the `<ForecastDetails />` and `<ForecastSummaries />` hold values, they will both be rendered as expected. If the `errorMessage` variable **does** contain text, the `<ForecastDetails />` and `<ForecastSummaries />` will **not** be rendered, and *instead* the `<LocationDetails />` will be rendered with the `errorMessage` variable in place of the `city` and `country`.

If the previous components were focused on retrieving the data (`location`, `date`, `errorMessage` etc.), then the `ForecastDetails` and `ForecastSummaries` components are all about how we present the data to the user. As such, save for some basic destructuring and date formatting at the beginning of the file, the rest of the module almost reads like an HTML document:
```JavaScript
import WeatherIcon from "react-icons-weather";

function ForecastDetails({ forecast }) {
  const { date, humidity, icon, temperature, wind } = forecast;
  const formattedDate = new Date(date).toDateString().slice(0, 10);
  return (
    <div className="forecast-details__wrapper">
      <div className="forecast-details__left">
        <div className="forecast-details__icon">
          <WeatherIcon name="owm" iconId={icon} />
        </div>
        <div
          className="forecast-details__date"
          data-testid="forecast-details__date"
        >
          {formattedDate}
        </div>
      </div>
      <div className="forecast-details__right">
        <div className="forecast-details__temperature">
          <p className="forecast-details__heading">Temperature</p>
          <p>Max: {temperature.max}°C</p>
          <p>Min: {temperature.min}°C</p>
        </div>
        <div className="forecast-details__humidity">
          <p>Humidity: {humidity}%</p>
        </div>
        <div className="forecast-details__wind">
          <p className="forecast-details__heading">Wind</p>
          <div className="forecast-details__wind-speed">
            <p>Speed: {wind.speed}m/s</p>
          </div>
          <div className="forecast-details__wind-direction">
            <p>Direction: {wind.direction.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForecastDetails;
```
> Because we separated our concerns into separate modules, `<ForecastDetails />` doesn't contain much *logic* - instead, the main function of the module is to use the data which was retrieved by our other modules and arrange it on the page. You will notice that JSX code has been used here to insert the attributes which we destructured from `forecast`, into our `<div>` elements - i.e. `{temperature.max}`, `{wind.speed}`, etc.
> Another noteworthy detail is the `className` attributes - these are used in conjunction with CSS stylesheets to style the elements on the page.

Lastly, you will notice the `<WeatherIcon />` component, which is used to display the weather icon. This is a custom, third-party component which is used to display weather icons which are compatible with our API. The `name` attribute is used here to determine which set of icons to display - in this case, we are using **Open Weather Map** (`owm`) - and the `iconId` attribute is used to determine which weather icon to display (i.e. Sunny, Cloudy, etc).

Lastly, it is important to validate the props which have been passed in to the component, using PropTypes to define exactly how we expect the data to look, in order for our component to function as expected:
```JavaScript
ForecastDetails.propTypes = {
  forecast: PropTypes.shape({
    date: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    temperature: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
    }).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number,
      direction: PropTypes.string,
    }).isRequired,
    humidity: PropTypes.number.isRequired,
  }).isRequired,
};
```
<br>

### ForecastSummaries & ForecastSummary
There are now just two modules of our App that we have not yet looked at - and they work in parallel to display the 5-day look-ahead forecast to our user. `<ForecastSummaries />` is the last component which is rendered by the App component and - as with the `<WeatherIcon />` component in the previous section - `<ForecastSummary />` is not called within `<App />` itself, but from within the `<ForecastSummaries />` component:
```JavaScript
// ForecastSummaries.js
function ForecastSummaries({ forecasts, onForecastSelect }) {
  return (
    <div className="forecast-summaries">
      {forecasts &&
        forecasts.map((forecast) => (
          <ForecastSummary
            key={forecast.date}
            date={forecast.date}
            description={forecast.description}
            icon={forecast.icon.toString()}
            onSelect={onForecastSelect}
            temperature={forecast.temperature}
          />
        ))}
    </div>
  );
}
```
> `<ForecastSummaries />` takes the passed in `forecasts` array, and maps through it to produce one `<ForecastSummary />` component for each item in the array, all contained within the single `<div>` which is rendered by `<ForecastSummaries />`.

The `<ForecastSummary />` component takes the props for each item in the `forecasts` array and displays a summary of the forecast for that day.
```JavaScript
// ForecastSummary.js
function ForecastSummary(props) {
  const { date, description, icon, temperature, onSelect } = props;
  const formattedDate = new Date(date).toDateString().slice(0, 10);

  return (
    <div className="forecast-summary" data-testid="forecast-summary">
      <div className="forecast-summary__date">{formattedDate}</div>
      <div className="forecast-summary__icon" data-testid="forecast-icon">
        <WeatherIcon name="owm" iconId={icon} />
      </div>
      <div className="forecast-summary__maxTemp">
        <p className="forecast-summary__maxTemp">{temperature.max}°C</p>
      </div>
      <div className="forecast-summary__description">{description}</div>
      <button
        type="button"
        className="forecast-summary__more-details"
        onClick={() => onSelect(date)}
      >
        More details
      </button>
    </div>
  );
}
```
> If the user wishes to find out more about a particular day's forecast, they can click on the 'More details' button, which, following the trail back to App.js, will call the `onForecastSelect` function, passing in the `date` of the forecast they wish to see more details about:
```JavaScript
// App.js
  const handleForecastSelect = (date) => {
    setSelectedDate(date);
  };
```
> This function updates the *state* of `selectedDate`, which is passed back into `<ForecastDetails />` to display the details of the selected forecast.
<br>

## Examples of Use
Whilst this particular project uses this code to display Weather forecasts, the structure of the App, and the separation of concerns into different modules, mean that this codebase could be used as a starting point for any kind of App which takes an array of data, and maps through it to show relevant information.

*Consider the following:*
**Video Streaming Service**
> A video streaming service which presents thumbnails of TV Shows or Movies, with a Header Area showing more info (or a trailer!) relating to the currently selected video.

**Social Media feed**
> A social media feed which displays the latest posts from a particular social media platform, with a focus area to focus in on a particular post.
<br>

## Project Status
Complete ✅


## Sources & Credits
This project forms part of the FrontEnd module at [ManchesterCodes](https://github.com/mcrcodes) Software Engineering bootcamp.