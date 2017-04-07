import { RECEIVE_WEATHER } from '../actions/weather_actions';

const WeatherReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_WEATHER:
      const weather = JSON.parse(action.weather[0]);
      weather.location = action.weather[1];
      return weather;
    default:
      return state;
  }
};

export default WeatherReducer;
