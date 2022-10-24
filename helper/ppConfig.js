const passport = require('passport');

// requring pasport local strategy
const LocalStrategy = require('passport-local').Strategy;

const User = require("../models/User");

// Serialze User
// Saving the data into the session
passport.serializeUser(function(user, done){
    done(null, user.id)
});

// DeSerialze User
// Reading the infon from the DB according to the ID from Session.
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: "emailAddress",
    passwordField: "password"
},
    function(emailAddress, password, done) {
      User.findOne({ emailAddress: emailAddress }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

module.exports = passport;