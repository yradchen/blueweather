export const RECEIVE_WEATHER = "RECEIVE_WEATHER";
import * as WeatherApiUtil from '../util/weather_api_util';
import { receiveErrors } from './error_actions';
export const receiveWeather = (weather) => ({
  type: RECEIVE_WEATHER,
  weather
});

export const fetchWeather = (geocode) => dispatch => {
  return (
  WeatherApiUtil.fetchWeather(geocode)
  .then(weather => dispatch(receiveWeather(weather)),
  errors => dispatch(receiveErrors(errors.responseJSON)))
);
};
