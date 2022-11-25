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

// require path
const path = require('path')
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
app.use(express.static(path.join(__dirname, 'build')));


// Require express-ejs-layouts
const expressLayouts = require('express-ejs-layouts');

// Import Routes
const authRouter = require('./routes/auth');
// const userRouter = require('./routes/trainers');
const userRouter = require('./routes/user');
const pokegotchiRouter = require('./routes/pokegotchi'); // uncommented, corrected spelling error

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

// * Take 3 : CORS error
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://pokegotchi-frontend-project-4-general-assembly-sei-6-3tgidmsio");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

// // Mount Routes
app.use('/', authRouter);
// app.use('/', trainerRouter);
app.use('/', userRouter);
app.use('/', pokegotchiRouter);

// NodeJS will look in a folder called views/ for all EJS related files.
app.set("view engine", "ejs");

// after build in be
app.get("/*", function(req, res){
    // // * Take 2 in attempting to resolve CORS errors:
    // res.header("Access-Control-Allow-Origin", "*");
    // res.send(response.data);
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})
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


console.log("testing Pokegotchi API")

// * -- Repeating Axios call in order to decrement all PokeGotchi levels every two hours:

// Require Axios:
const axios = require('axios');

// Axios API call, call timer function recursively:
function reduceLevels(){
    axios.put(`http://localhost:3000/pokegotchi/decrementlevels`) // ? I'm not sure if this needs localhost or not?
    .then(res => {
        console.log('levels reduced by 1')
        console.log(res) // should show something like:
            // {
            //     "pokegotchi": {
            //         "acknowledged": true,
            //         "modifiedCount": 34,
            //         "upsertedId": null,
            //         "upsertedCount": 0,
            //         "matchedCount": 34
            //     }
            // }
    }) 
    .catch(err => {
        console.log(err)
    })
    repeatTwelveTimesDaily();
}

// Timer function, executes the above function every two hours:
function repeatTwelveTimesDaily() {
    setTimeout(reduceLevels, 7200000);
}

// start off the loop:
setTimeout(reduceLevels, 7200000)

// -- Demonstration:

// function logSomething(){
//     console.log('something!');
//     repeatMe();
// }
// function repeatMe() {
//     setTimeout(logSomething, 1500);
// }
// setTimeout(logSomething, 1500);