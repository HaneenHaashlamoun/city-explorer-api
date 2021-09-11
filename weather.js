'use strict';

const axios = require('axios');
const weatherKey = process.env.WEATHER_API_KEY;


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
  
  class Forcast {
    constructor(item) {
      this.date = item.valid_date;
      this.description = `Low of ${item.low_temp}, high of ${item.max_temp} with broken clouds${item.weather.description}`;
    }
  }

  module.exports = getWeather;