export default {
  BASE_URL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : 'https://my-meals-server.herokuapp.com',
  INPUT_DEBOUNCE: 500
};
