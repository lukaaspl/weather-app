import React from 'react';

const WeatherForm = props => {
    return (
        <form onSubmit={props.handleSubmitForm}>
            <input type="text" placeholder="Enter a city name..." onChange={props.handleChange} value={props.city} />
            <button disabled={props.city.length < 3}>Check weather</button>
        </form>
    );
}

export default WeatherForm;