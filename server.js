var express = require('express');
var mongodb = require('mongodb');
var parsetime = require('./parsetime');

var app = express();

app.use('/',parsetime);

app.listen(3000);
