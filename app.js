//중추
const express = require('express');
const bodyParser = require("body-parser");
const dotnev =require('dotenv');
const morgan = require('morgan');

var fs = require('fs');

dotnev.config();

const app = express();
const home = require("./src/routes/home");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));
app.set("views","./src/views");
app.set("view engine",'ejs');
app.use('/', home);
app.use(express.static(`${__dirname}/src//public`));


module.exports = app;