//Backend 

// Require Express
const express = require('express');
const bodyParser = require ('body-parser')

// Require and Initialze dotenv
require('dotenv').config();

// Require Connect Flash
// const flash = require('connect-flash');

// Require Mongoose
const mongoose = require('mongoose');

// Port Configuration
const PORT = process.env.PORT;

// Initialze Express
const app = express();

// ? will this fix it?
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Using Connect Flash
// app.use(flash());

// Look for all static files in public folder
// (CSS, JS, Images, Videos, Audio files)
// app.use(express.static("public"));

// Require express-ejs-layouts
const expressLayouts = require('express-ejs-layouts');

// Import Routes
const authRouter = require('./routes/auth');
// const userRouter = require('./routes/trainers');
// const pokegochiRouter = require('./routes/pokegochi');

// Look into views folder for the file named as layout.ejs
app.use(expressLayouts);

// Express Session and Passport
let session = require('express-session');
let passport = require('./helper/ppConfig');
// const { use } = require('./helper/ppConfig');

app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: 3600000}
}))

// Initialze passport and passport session
app.use(passport.initialize());
app.use(passport.session());

// Sharing the information with all pages
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
//     res.locals.alerts = req.flash();
    next();
})

// // Mount Routes
app.use('/', authRouter);
// app.use('/', trainerRouter);
// app.use('/', pokegochiRouter);

// NodeJS will look in a folder called views/ for all EJS related files.
app.set("view engine", "ejs");

// Database Connection
mongoose.connect(process.env.MONGODBURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("MongoDB connected!!!")
    }
);

app.listen(PORT, () => {
    console.log(`BlogApp is running on port ${PORT}`);
})


// Check root route is working
