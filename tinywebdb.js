var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Initilize datastore
datastore = {};

// Root path
app.get('/', function (req, res) {
  var response = 'TinyWebDB by Nizar AYED<br>\n';
  response += 'Datastore: <br>\n' + JSON.stringify( datastore );
  res.send( response );
})

// Store a Value path
// Path :   /storeavalue
// Params : tag
// params : value
// Method : POST
app.post('/storeavalue', function (req, res) {
  try {
    var tag   = req.query.tag || req.body.tag;
    var value = req.query.value || req.body.value;
    if( tag == null ) throw 'Tag is missing';
    if( value == null ) value = '';
    datastore[tag] = value;
    console.log( "Tag: %s\nValue:%s\nDatastore : \n%s", tag, value, JSON.stringify( datastore ) );
    res.type('application/json');
    res.send( ["STORED", tag, datastore[tag]] );
  }
  catch( err ) {
    msg = {
      error : err,
      query : req.query,
      body : req.body
    }
    res.status(500).json( msg ); 
  }
})

app.post('/getvalue', function (req, res) {
  // Uncomment the following to debug
  // console.log( "Tag : %s", req.query.tag );
  // console.log( "DataStore : %s", JSON.stringify( datastore ) );
  try {
    var tag = req.query.tag || req.body.tag;
    if( tag == null ) throw 'Tag is missing.';
    res.type('application/json');
    res.json( [ "VALUE", tag, (datastore[tag] || "") ] );
  } catch ( err ) {
    msg = {
      error : err,
      query : req.quey,
      body : req.body
    };
    res.status(500).json( msg ); 
  }
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
   
  console.log("TinyWebDB app listening at http://%s:%s", host, port)
})
