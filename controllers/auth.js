const User = require("../models/User");
// const jwt = require("jsonwebtoken")

//let passport = require("../helper/ppConfig");

// const bcrypt = require('bcrypt');
// const salt = 10;

// root route
// 
exports.home_get = (req, res) => {
    res.render("/")
}
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

    user.save()
    .then(()=> {
        res.send("Successfully created new user")
    })
    .catch((err)=> {
        console.log(err);
        res.send("try again later")
    })
    // console.log(req.body.password);
    // let hash = bcrypt.hashSync(req.body.password, salt);
    // console.log(hash);

    // user.password = hash;

    // user.save()
    // .then(()=> {
    //     res.redirect("/");
    // })
    // .catch((err)=> {
    //     console.log(err);
    //     res.send("Please try again later.")
    // })
}
    // user.save()
    // .then(() = {
    //     res.redirect("/");
    // })  
//     console.log(req.body.password);
//     let hash = bcrypt.hashSync(req.body.password, salt);
//     console.log(hash);

//     user.password = hash;

//     user.save()
//     .then(()=> {
//         res.json({"message": "User created succesfully"})
//     })
//     .catch((err)=> {
//         console.log(err);
//         res.json({"message": "Error creating user"})
//     })
// }

// ! SIGN IN ROUTES
// HTTP GET - Signin Route - To load the signin form
exports.auth_signin_get = (req, res) => {
    res.render("auth/signin");
}




// HTTP POST - Signin Route - To post the data for authentication
// exports.auth_signup_post = async(req, res) => {
//     let {emailAddress, password} = req.body
    
//     console.log(emailAddress);

//     try{
//         let user = await User.findOne({emailAddress})
//         console.log(user)

//         if(!user)
//         {
//             return res.status(400).json({ "message": "User not found"})
//         }

//         // Password Comparison
//         const isMatch = await bcrypt.compareSync(password, user.password)
//         console.log(password) //plain text password
//         console.log(user.password) //encrypted password from database

//         if(!isMatch){
//             return res.status(400).json({"message": "Password Not Matched"})
//         }
        
//         //JWT TOKEN
//         const payload = {
//             user:{
//                 id: user._id,
            
//             }
//         }

//         jwt.sign(
//             payload,
//             process.env.SECRET,
//             { expiresIn: 360000000000000},
//             (err, token) => {
//                 if(err) throw err;
//                 res.json({token}).status(200)         
//              }
//         )
//     }
//     catch(error){
//         console.log(error)
//         res.json({"message": "you are not logged in!"}).status(400)
//     }
// }

// HTTP GET - Logout Route
exports.auth_logout_get = (req, res) => {
   req.logout(function(err) {
    if(err) { return next(err);}
    req.flash("success", "You are logged out successfully")
    res.redirect("/auth/signin");
   }) 
}