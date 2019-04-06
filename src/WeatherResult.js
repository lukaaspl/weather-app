import React, { Component } from 'react';

class WeatherResult extends Component {
    state = {
        updating: true,
    }

    componentDidMount() {
        this.startUpdating();
    }

    componentWillUnmount() {
        this.stopUpdating();
    }

    startUpdating() {
        this.intervalID = setInterval(() => this.props.getWeather(this.props.weather.name), 7200);
    }

    stopUpdating() {
        clearInterval(this.intervalID);
    }

    handleSwitchUpdate = () => {
        if (this.state.updating)
            this.stopUpdating();
        else
            this.startUpdating();

        this.setState(prevState => ({
            updating: !prevState.updating,
        }))
    }

    render() {
        const weather = this.props.weather;

        const dateTime = new Date().toLocaleString();
        let sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString();
        let sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString();

        const updateButtonClasses = 'fas fa-sync-alt updating-btn';

        return (
            <div className="weather-result">
                <h2>Search results for {weather.name}, {weather.sys.country}</h2>
                <p>
                    Data for {dateTime}
                    <i onClick={this.handleSwitchUpdate} className={this.state.updating ? `${updateButtonClasses} active` : updateButtonClasses}></i>
                </p>

                <table>
                    <tbody>
                        <tr>
                            <th>Temperature</th>
                            <td>{weather.main.temp} &#176;C (min: {weather.main.temp_min.toFixed(1)} &#176;C, max: {weather.main.temp_max.toFixed(1)} &#176;C)</td>
                        </tr>
                        <tr>
                            <th>Pressure</th>
                            <td>{weather.main.pressure} hPa</td>
                        </tr>
                        <tr>
                            <th>Humidity</th>
                            <td>{weather.main.humidity}%</td>
                        </tr>
                        <tr>
                            <th>Wind speed</th>
                            <td>{weather.wind.speed} m/s</td>
                        </tr>
                        <tr>
                            <th>Sunrise</th>
                            <td>{sunrise}</td>
                        </tr>
                        <tr>
                            <th>Sunset</th>
                            <td>{sunset}</td>
                        </tr>
                    </tbody>
                </table>


                <button onClick={this.props.getBack}>Check weather in another city</button>
            </div>
        )
    }
}

export default WeatherResult;