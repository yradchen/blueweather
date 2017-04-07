export const fetchSearches = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/searches/'
  });
};

export const createSearch = (search) => {
  return $.ajax({
    method: 'POST',
    url: 'api/searches/',
    data: search
  });
};
