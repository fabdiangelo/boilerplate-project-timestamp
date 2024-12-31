var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", function (req, res) {
  let date = new Date();
  res.json({"unix": date.getTime(), "utc": date.toUTCString()});
});

app.get("/api/:date", function (req, res) {
  let date = new Date (Number(req.params.date));
  if(isNaN(Number(req.params.date))) {
    date = new Date(req.params.date);
  }
  if (date.getTime() === null || isNaN(date.getTime())) res.json({ error : "Invalid Date" });
  res.json({"unix": date.getTime(), "utc": date.toUTCString()});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});