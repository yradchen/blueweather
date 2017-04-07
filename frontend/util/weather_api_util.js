
export const fetchWeather = (geocode) => {
  return $.ajax({
    method: 'GET',
    url: `api/weather/`,
    data: { geocode }
  });
};
