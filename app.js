const express = require("express"),
    mongoose = require("mongoose"),
    keys = require("./config/keys"),
    route = require("./routes/route"),
    path = require("path"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    passportSetup = require('./config/passport-setup'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session');
    
const app = express();
const port = 3000;

app.set("view engine","ejs");

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}));

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Connect to DB
mongoose.connect(keys.mongodb.dbURL);

//Verify DB connection
mongoose.connection.on('connected',() => {
    console.log("Connected to MongoDB");
});

//Middleware
app.use(cookieSession({
    name: 'session',
    keys: ['123']
}));
app.use(cookieParser());

//connect to router
app.use('/',route);

app.listen(process.env.PORT || 3000,()=>{
    console.log(__dirname);
    console.log("Server started at 3000");
})