var express = require('express');
var app = express();
var fs = require("fs");

app.get('/', function (req, res) {
  res.send('TinyWebDB by Nizar AYED');
})

app.post('/storevalue', function (req, res) {
  fs.readFile( __dirname + "/" + "tinydb.json", 'utf8', function (err, data) {
    data = JSON.parse( data );

    console.log( "Before : " );
    console.log( JSON.stringify(data) );
    data[ req.query.tag ] = req.query.value;
    console.log( "After : " );
    console.log( JSON.stringify( data ) );

    fs.writeFile( "tinydb.json", JSON.stringify( data ), "utf8", (err) => {
      if (err) throw err;
      console.log('It\'s saved!');
    });
    res.send( JSON.stringify( data ) );
  });
})

app.get('/getvalue', function (req, res) {
  console.log(req.query.tag);
  res.send(req.query.tag);
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
   
  console.log("Example app listening at http://%s:%s", host, port)
})
