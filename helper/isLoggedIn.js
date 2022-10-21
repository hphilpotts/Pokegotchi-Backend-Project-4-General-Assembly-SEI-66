






// Authorisation when connected to FE
// const jwt = require("jsonwebtoken")
// require("dotenv").config();

// module.exports = (req, res, next) => {

//     // token from authorisation header:
//     let token = ""
//     let authorizationToken = req.header("Authorization")
//     console.log(authorizationToken);

//     if(!authorizationToken){
//         return res.json({"message": "Please sign up or log in to view this page."})
//     }

//     if(authorizationToken){
//         authorizationToken = authorizationToken.replace("Bearer ", "")
//         console.log(authorizationToken);
//         token = authorizationToken
//     }

//     try{
//         const decodedToken = jwt.verify(token, process.env.SECRET);

//         req.user = decodedToken.user;
//         next();
//     }
//     catch(error){
//         return res.json({"message": "Your authentication token is invalid"})
//     }
// }