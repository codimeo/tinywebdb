var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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
    var tag   = req.query.tag;
    var value = req.query.value;
    if( tag == null ) throw 'Tag is missing';
    if( value == null ) value = '';
    datastore[ tag ] = value;
    console.log( "Tag: %s\nValue:%s\nDatastore : \n%s", tag, value, JSON.stringify( datastore ) );
    res.json( [ "STORED", req.query.tag, datastore[ req.query.tag ] ] );
  }
  catch( err ) {
    msg = {
      error : err,
      query : req.query,
      body : req.body
    }
    res.json( msg ); 
  }
})

app.post('/getvalue', function (req, res) {
  // Uncomment the following to debug
  // console.log( "Tag : %s", req.query.tag );
  // console.log( "DataStore : %s", JSON.stringify( datastore ) );
  try {
    if( req.query.tag == null || !req.query.tag ) throw 'Tag is missing.';
    res.json( [ "VALUE", req.query.tag, datastore[ req.query.tag ] ] );
  } catch ( err ) {
    msg = {
      error : err,
      query : req.quey,
      body : req.body
    };
    res.json( msg ); 
  }
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
   
  console.log("TinyWebDB app listening at http://%s:%s", host, port)
})
