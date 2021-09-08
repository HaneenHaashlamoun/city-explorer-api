'use strict';

const express = require('express')
const app = express();
const cors = require('cors');
app.use(cors());
// const PORT = process.env.PORT;


const weather = require('./data/weather.json')

app.get('/',
  function (request, response) {
    response.send(weather.city_name)
  })

app.get('/get-wethear', (request, response) => {
  // const lat = request.query.lat;
  // const lon = request.query.lon;
  const city_name = request.query.city_name;

  if (city_name) {
    const returnArray = weather.filter((item) => {
      return item.city_name === city_name;
    });
    const data = returnArray.data.map(item => {
      return new Forcast(item);
    })
    console.log(data);

    if (returnArray.length) {
      response.json(data);
    } else {
      response.send('no data found :disappointed:')
    }
  } else {
    response.json(weather);
  }

})

class Forcast {
  constructor(item) {
    this.date = item.valid_date;
    this.description = `Low of ${item.low_temp}, high of ${item.max_temp} with broken clouds${item.weather.description}`;
  }
}

// kick start the express server to work
app.listen(3001, () => {
  console.log(`Server started on port`);
});