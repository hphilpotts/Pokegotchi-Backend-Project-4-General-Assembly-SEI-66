const User = require("../models/User");
// require jsonwebtoken
const jwt = require("jsonwebtoken")
let passport = require("../helper/ppConfig");
//require bcrypt for hashing
const bcrypt = require('bcrypt');
const salt = 10;
// ! SIGN UP ROUTES
// HTTP GET - Signup Route - To load signup form
exports.auth_signup_get = (req, res) => {
    res.render("auth/signup");
}
// HTTP POST - Signup Route - To post the data to MongoDB for registration
// exports.auth_signup_post = (req, res) => {
//     let user = new User(req.body);
exports.auth_signup_post = (req, res) => {
    let user = new User(req.body);
    console.log(req.body);
    console.log(req.body.password)
    // encrypting password in database
    let hash = bcrypt.hashSync(req.body.password, salt);
    console.log(hash);
    user.password = hash;
    user.save()
    .then(()=> {
        // res.send("Successfully created new user")
        res.json({"message": "User created sucessfully!"})
    })
    .catch((err)=> {
        console.log(err);
        // res.send("try again later")
        res.json({"message": "error creating user, try again!"})
    })
}
// ! SIGN IN ROUTES
// HTTP GET - Signin Route - To load the signin form
exports.auth_signin_get = (req, res) => {
    res.render("auth/signin");
}
// HTTP POST = Signin Route - to Sign User in
exports.auth_signin_post = async(req, res) => {
    let {emailAddress, password} = req.body;
    console.log(emailAddress)
        try{
        let user = await User.findOne({emailAddress}) //emailAddress: emailAddress
        console.log(user)
        if(!user)
        {
            return res.json({ "message": "User not found"}).status(400)
        }
        // Password Comparison
        const isMatch = await bcrypt.compareSync(password, user.password)
        console.log(password) //plain text password
        console.log(user.password) //encrypted password from database
        if(!isMatch){
            return res.json({"message": "Password Not Matched"}).status(400)
        }
        //JWT TOKEN
        const payload = {
            user:{
                id: user._id,
            }
        }
        jwt.sign(
            payload,
            process.env.SECRET,
            { expiresIn: 360000000000000},
            (err, token) => {
                if(err) throw err;
                res.json({token}).status(200)
             }
        )
    }
    catch(error){
        console.log(error)
        res.json({"message": "you are not logged in!"}).status(400)
    }
}
// HTTP GET - Logout Route
exports.auth_logout_get = (req, res) => {
    // Invalidates the session
   req.logout(function(err) {
    if(err) { return next(err);}
    console.log("you've logged out")
    res.redirect("/");
   })
}