export const fetchGeocode = (address) => {
  return $.ajax({
    method: 'GET',
    url: `api/geocode/`,
    data: { address }
  });
};
