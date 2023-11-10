//Import Express
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require('passport');
const path = require('path')
const handlebars = require('express-handlebars')
var xss = require('xss-clean')

// Initialize App
const app = express();
 
//xss prevention
app.use(xss());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs')

// app.use(express.static('./views'))
//cors
app.use(cors());

// Import App Config
const config = require("./config");


// define directory
global.__base = __dirname + '/';
global.__utils = __dirname + '/app/utils/';
global.__modules = __dirname + '/app/modules/';
global.__common_module_v1 = __dirname + '/app/modules/common/api/v1/';

try{
// Database configuration
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
});
}catch(err){
    console.log("Error connecting Mongodb");
    console.log(err.message)
}


// Setup server port
const port = config.port;
// Application Route
const apiRoutes = require("./app/routes/index");



app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb', extended: false}));

app.use(passport.initialize());

// Send message for default route URL
app.use('/', apiRoutes);


app.use('/docs', express.static(__dirname + '/apidoc'));


// Launch app to listen to specified port
app.listen(port, () => {
    console.log("Running Nodejs Api on port " + port);
});