import React, { Component, Fragment } from 'react';
import './App.css';
import WeatherForm from './WeatherForm';
import WeatherResult from './WeatherResult';

class App extends Component {
  state = {
    city: "",
    weather: null,
    error: false,
  }

  APIKey = '2596c0ef9048bea7629ab35246d80326';

  handleChange = e => {
    this.setState({
      city: e.target.value,
    })
  }

  handleSubmitForm = e => {
    e.preventDefault();

    this.getWeatherForCity(this.state.city);
  }

  getWeatherForCity = city => {
    const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.APIKey}&units=metric`;

    fetch(APIUrl)
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw Error();
      })
      .then(response => {
        this.setState({
          weather: response,
          error: false,
        })
      })
      .catch(error => {
        const errorMsg = <div className="city-not-found">Look's like choosen city (<strong>{city}</strong>) doesn't exist in our database.</div>;

        this.setState({
          weather: null,
          error: errorMsg,
        })
      })
  }

  getBackToForm = () => {
    this.setState({
      city: "",
      weather: null,
      error: false,
    })
  }

  render() {
    let view;

    if (this.state.weather)
      view = (
        <WeatherResult weather={this.state.weather}
          getBack={this.getBackToForm}
          getWeather={this.getWeatherForCity} />
      )
    else
      view = (
        <Fragment>
          <WeatherForm
            handleChange={this.handleChange}
            handleSubmitForm={this.handleSubmitForm}
            city={this.state.city}
          />

          {(this.state.error && this.state.weather === null) && this.state.error}
        </Fragment>
      )

    return (
      <React.Fragment>
        <div className="layer"></div>
        <div className="container">
          <h1 className="logo">Reactive Weather</h1>
          {view}
        </div>
      </React.Fragment>
    );
  }
}

export default App;