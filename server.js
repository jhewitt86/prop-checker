var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(err, req, res, next){
  res.status(400).send({"error": "Please ensure payload is application/json formatted object."});
})

var routes = require('./api/routes/checkRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'});
});

app.listen(port);

console.log('Running on ' + port);
