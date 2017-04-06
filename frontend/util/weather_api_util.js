export const fetchWeather = (lat, long, date) => {
  return $.ajax({
    method: 'GET',
    url: `api/weather/`,
    data: { weather: { lat: lat, long: long, date: date } }
  });
};
