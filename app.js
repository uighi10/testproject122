//중추
const express = require('express');
const bodyParser = require("body-parser");
const dotnev =require('dotenv');
const morgan = require('morgan');
const logger = require("./src/config/logger");

var fs = require('fs');

dotnev.config();

const app = express();
const home = require("./src/routes/home");

const accessLogStream = fs.createWriteStream(
    `${__dirname}/log/access.log`, 
    { flags: 'a' }
);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));
app.set("views","./src/views");
app.set("view engine",'ejs');
app.use('/', home);
app.use(express.static(`${__dirname}/src//public`));
app.use(morgan('dev',{stream:accessLogStream}));


module.exports = app;