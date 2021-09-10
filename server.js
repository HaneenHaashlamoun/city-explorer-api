'use strict';
require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT;


const weather = require('./data/weather.json')

const getWeather = (request, response) => {
  const name = request.query.city_name;

  try {
    const result = weather.find((item) => {
      if (item.city_name === name) {
        return item;
      }
    })
    let data = result.data.map(item => {
      return new Forcast(item);
    })
    response.send(data);
  }
  catch {
    response.send('ERROR');
  }
}

app.get('/',
  function (request, response) {
    response.send('hello from home ')
  })

app.get('/get-wethear', getWeather);


class Forcast {
  constructor(item) {
    this.date = item.valid_date;
    this.description = `Low of ${item.low_temp}, high of ${item.max_temp} with broken clouds${item.weather.description}`;
  }
}

// kick start the express server to work
app.listen(PORT, () => {
  console.log(`Server started on port`);
});