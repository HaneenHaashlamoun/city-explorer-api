'use strict';
require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
app.use(cors());
const axios = require('axios');
const getWeather = require('./weather');
const getMovie = require('./movie')

const PORT = process.env.PORT;

function getMovie(request, response) {
  let name = request.query.city_name;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${name}`;
  axios
    .get(url)
    .then(result => {
      let newMovie = result.data.results.map(item => {
        return new Movie(item);
      })
      response.send(newMovie)
    })
    .catch(err => console.log(err))
}
app.get('/',
  function (request, response) {
    response.send('hello from home ')
  })

app.get('/get-wethear', getWeather);
app.get('/get-movies', getMovie);

// kick start the express server to work
app.listen(PORT, () => {
  console.log(`Server started on port`);
});