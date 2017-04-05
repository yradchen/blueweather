export const RECEIVE_WEATHER = "RECEIVE_WEATHER";
import * as WeatherApiUtil from '../util/weather_api_util';

export const receiveWeather = (weather) => ({
  type: RECEIVE_WEATHER,
  weather
});

export const fetchWeather = (lat, long) => dispatch => {
  return (
  WeatherApiUtil.fetchWeather(lat, long)
  .then(weather => dispatch(receiveWeather(weather)))
);
};
