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