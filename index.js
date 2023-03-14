const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { DateTime } = require('luxon');
const isPeak = require('./peakCheck.js');

let numvisits = 1;

var now = DateTime.local().setZone('America/Phoenix');

console.log(now.toLocaleString(DateTime.TIME_SIMPLE));

let status = isPeak.peakStatus()
let localtime = now.toLocaleString(DateTime.TIME_SIMPLE);

//Middleware
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

//Routes
app.get('/', function(req, res, next) {
  res.render('index', { status: status, visits: numvisits, currentTime: localtime });
  numvisits += 1;
})

app.get('/status', function(req, res, next) {
  res.json({ "status": status });
});

//Listen
app.listen(3000);

console.log('Listening on 3000 | %cServer is ready to go!', "color: green")