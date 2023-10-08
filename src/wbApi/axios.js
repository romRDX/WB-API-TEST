const axios = require('axios');

// const test = process.env.HEROKU_DB || 'http://localhost:3001/'
const test = "https://warbeasts-api.herokuapp.com";
// const test = 'http://localhost:3001/';

const apiWB = axios.create({
    baseURL: test, // //process.env.NEXT_PUBLIC_CADASTRO_API_HOST
});

module.exports = apiWB;
