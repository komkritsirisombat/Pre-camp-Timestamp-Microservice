// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});


let responseObject = {};
app.get('/api/:date', (request, response) => {
  let date_string = request.params.date;
  if (date_string.includes('-')) {
    responseObject['unix'] = new Date(date_string).getTime();
    responseObject['utc'] = new Date(date_string).toUTCString();
  } else {
    /*timestamp*/
    date_string = parseInt(date_string);
    responseObject['unix'] = new Date(date_string).getTime();
    responseObject['utc'] = new Date(date_string).toUTCString();
  }

  /*
  if (!responseObject['unix'] || !responseObject['utc']) {
    responseObject['error'] = 'Invalid Date';
  }*/
  let date = new Date(date_string);
  if (date.toString() == 'Invalid Date') {
    response.json({'error': 'Invalid date'});
  }

  response.json(responseObject);
});


app.get('/api', (request, response) => {
  responseObject['unix'] = new Date().getTime();
  responseObject['utc'] = new Date().toUTCString();
  response.json(responseObject);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
