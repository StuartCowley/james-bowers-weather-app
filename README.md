# Weather App 🌦
### Introduction
This project forms part of the final, FrontEnd module at [ManchesterCodes](https://github.com/mcrcodes). The goal is to produce a simple application which takes Weather data from an API and presents it to the user in a web app.

## Contents
* [Languages & Technologies](#Languages--Technologies)
* [Project Setup](#Project-Setup)

* [Components & Scope of Functionalities](#Components--Scope-of-Functionalities)

* [Examples of Use](#Examples-of-Use)
* [Project Status](#Project-status)
* [Sources & Credits](#Sources--credits)
<hr>
<br>

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
> `LocationDetails` is itself a function, which has `props` passed to it, as noted previously. The `props` are then destructured into the `city`, `country` and `errorMessage` variables, which are then used in conjunction with a conditional statement to render the component. In this case, if errorMessage is not `null`, then the `<h1>` element is rendered with the `errorMessage` as its text. Otherwise, the `<h1>` element is rendered with the `city` and `country` as its text, separated by a comma.
<br>

#### PropTypes Validation
PropTypes is a library which comes bundled with *React* and is used to validate the data types of the props passed into the component. Once imported, PropTypes are defined at the end of the code, before the component is exported:

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

### GetForecast

## Examples of Use
[In development]


## Project Status
Complete ✅


## Sources & Credits
This project forms part of the FrontEnd module at [ManchesterCodes](https://github.com/mcrcodes) Software Engineering bootcamp.