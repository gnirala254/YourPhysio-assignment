const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config();

// server css as static
app.use(express.static(__dirname));

// to parse
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  var city1 = req.body.city1;
  var city2 = req.body.city2;

  axios
    .get(
      'https://www.mapquestapi.com/directions/v2/route?key=' +
        process.env.API_KEY +
        '&from=' +
        city1 +
        '&to=' +
        city2 +
        '&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false'
    )
    .then(function (response) {
      // handle success
      //   console.log(response.data.route );

      res.send(
        'Fastest route from ' +
          city1 +
          ' to ' +
          city2 +
          ' is, ' +
          (response.data.route.distance * 1.6).toFixed(2) +
          ' km. and the time taken is: ' +
          response.data.route.formattedTime
      );
    })
    .catch(function (error) {
      // handle error
      console.log('error');
    });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Application started and Listening on port 3000');
});
