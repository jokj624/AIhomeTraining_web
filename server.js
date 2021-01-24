var express = require('express');
var app = express(); 

var http = require('http');
var server = http.Server(app);

var port = 3000;
app.use(express.static(__dirname + '/public'));

 
server.listen(port, function() {
    console.log('Server On !');
});    