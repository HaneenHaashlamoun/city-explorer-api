'use strict';
require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
app.use(cors());
const axios = require('axios');

const PORT = process.env.PORT;
const weatherKey = process.env.WEATHER_API_KEY;
const movieKey = process.env.MOVIE_API_KEY;

// const weather = require('./data/weather.json')

const getWeather = (request, response) => {
  let name = request.query.city_name;
  let url = `http://api.weatherbit.io/v2.0/forecast/daily?city=${name}&key=${weatherKey}`;
  axios
    .get(url)
    .then(result => {
      let filteredData = result.data.data.map(item => {
        return new Forcast(item);
      })
      response.send(filteredData)
    })
    .catch(err => console.log(err))
}

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

class Forcast {
  constructor(item) {
    this.date = item.valid_date;
    this.description = `Low of ${item.low_temp}, high of ${item.max_temp} with broken clouds${item.weather.description}`;
  }
}
class Movie {
  constructor(item) {
    this.title = item.title;
    this.overview = item.overview;
    this.average_votes = item.vote_average;
    this.total_votes = item.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`;
    this.popularity = item.popularity;
    this.released_on = item.release_date;
  }
}

// kick start the express server to work
app.listen(PORT, () => {
  console.log(`Server started on port`);
});