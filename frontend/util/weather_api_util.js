export const fetchWeather = (lat, long) => {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const baseUrl = 'https://api.darksky.net/forecast/';
  const key = "ed962598e51297ed8e2ffacf5d6522b4";
  const url = `${baseUrl}${key}/${lat},${long}`;
  return $.ajax({
    method: 'GET',
    url: proxy + url
  });
};
