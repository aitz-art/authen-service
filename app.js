const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('config');

/*
logger configuration
*/
var morgan = require('morgan');
var winston = require('./config/winston');

/*
Config port Application
*/
const PORT = config.get('app.port');

// Set up mongoose connection
const mongo = require('./database/mongodb')
let user    = require('./routes/user.route');
let auth    = require('./routes/auth.route');

/*
service configuration
*/
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('combined', { stream: winston.stream }));

/*
route config
*/

app.use('/user', user);
app.use('/auth', auth);

/*
listen service
*/
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
