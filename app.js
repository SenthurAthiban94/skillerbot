const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const route = require("./routes/route");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportSetup = require('./config/passport-setup');

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

//connect to router
app.use('/',route);

app.listen(3000,()=>{
    console.log(__dirname);
    console.log("Server started at 3000");
})