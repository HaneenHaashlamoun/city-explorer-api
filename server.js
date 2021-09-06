'use strict';

const express = require('express') 
const app = express() 
const cors = require('cors');
app.use(cors())


const weather = require('./data/weather.json')

app.get('/', 
  function (request, response) {     
    response.send(weather.city_name) 
  })
  
  app.get('/get-wethear', (request, response) => {
   
    const city_name = request.query.city_name;
  
    if (city_name) {
      const returnArray = weather.filter((item) => {
        return item.city_name === city_name;
      });
  
      if (returnArray.length) {
        response.json(returnArray);
      } else {
        response.send('no data found :disappointed:')
      }
    } else {
      response.json(weather);
    }
  })
  
  
  
  
  // kick start the express server to work
  app.listen(3001, () => {
    console.log(`Server started on port`);
  });