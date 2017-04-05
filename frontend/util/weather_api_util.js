export const fetchWeather = (lat, long) => {
  var proxy = 'https://cors-anywhere.herokuapp.com/';
  const baseUrl = 'https://api.darksky.net/forecast/';

  const url = `${baseUrl}${key}/${lat},${long}`;
  return $.ajax({
    method: 'GET',
    url: proxy + url
  });
};
