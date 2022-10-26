const Pokegotchi = require("../models/Pokegotchi");
// const {Trainer} = require("../models/Trainer");
const axios = require('axios');
const ObjectId = require('mongoose').Types.ObjectId

// const moment = require('moment');

// HTTP GET - load Pokegotchi - currently randomly generates 
// Apply isLoggedin to this route, associate pokegotchi with signed in user 
exports.user_pokegotchi_load = (req, res) => {
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
      };

    let randomisedPokeId = getRandomIntInclusive(1,151);
    console.log(randomisedPokeId);

    // axios.get('https://pokeapi.glitch.me/v1/pokemon/1/')
    //     .then((response) => {
    //         // console.log(response);
    //         // console.log(response.data)
    //         let pokeId = response.data[0]
    //         console.log(pokeId)
    //         let newPokegotchi = new Pokegotchi({
    //             name: pokeId.name,
    //             pokedex: pokeId.number,
    //             description: pokeId.description,
    //             hp: 10,
    //             age: 0,
    //             cleanLevel: 10,
    //             foodLevel: 10,
    //             playLevel: 10,
    //         })
    //         newPokegotchi.save((err, user) => {
    //             if(err) {
    //                 console.log("failed to save new pokegotchi")
    //             } else {
    //                 console.log(newPokegotchi)
    //             }
    //           }); 
    //         });
            
          //console.log(response.data[0].species);
         //console.log(response.data[0].sprite);
    res.render('pokegotchi/load')
}
// exports.user_pokegotchi_get= (req, res) => {
//     let user = new User(req.body);
//     console.log(req.body);
//     console.log(req.body.password)
//     // encrypting password in database
//     let hash = bcrypt.hashSync(req.body.password, salt);
//     console.log(hash);
//     user.password = hash;
//     user.save()
//     .then(()=> {
//         // res.send("Successfully created new user")
//         res.json({"message": "User created sucessfully!"})
//     })
//     .catch((err)=> {
//         console.log(err);
//         // res.send("try again later")
//         res.json({"message": "error creating user, try again!"})
//     })
// }

// }
// ! don't believe we'll need to iterate through all 151 as user
// ! will select the pokemon of their choice and we then just get that data?
// axios.get('https://pokeapi.glitch.me/v1/pokemon/1/')
//     .then((response) => {
//         console.log(response.data[0].name);
//         console.log(response.data[0].species);
//         console.log(response.data[0].sprite);
//     })
//     .catch(error => {
//         console.log(error);
//     });
    

// HTTP POST - pokegotchi
// exports.pokegochi_create_post = (req, res) => {

//     let pokegotchi = new pokegotchi(req.body);

//     pokegotchi.save()
//     .then(() => {

//         M2MR
//         req.body.trainer.forEach(trainer => {
//             Trainer.findById(trainer, (error, trainer) => {
//                 trainer.pokegotchi.push(pokegotchi);
//                 trainer.save();
//             })
//         });
//         res.redirect("/pokegotchi/index");
//     })
//     .catch((err) => {
//         console.log(err);
//         res.send("Please try again later!!!");
//     })
// }


// HTTP GET - pokegotchi Index API
// exports.pokegochi_index_get = (req, res) => {
//     pokegotchi.find().populate('trainer')
//     .then(pokegochis => {
//         res.render("pokegotchi/index", {pokegochis: pokegochis, moment})
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }

// * rewritten for JSON, working in Postman:
// exports.pokegotchi_index_get = (req, res) => {
//     Pokegotchi.find()
//     .then(pokegotchi => {
//         res.json({pokegotchi})
//     })
//     .catch(err => {
//         console.log(err)
//     })
// }



// // HTTP GET - pokegotchi By Id
// exports.pokegochi_show_get = (req, res) => {
//     console.log(req.query.id);

//     // Find the pokegotchi by ID
//     pokegotchi.findById(req.query.id).populate('trainer')
//     .then(pokegotchi => {
//         res.render("pokegotchi/detail", {pokegotchi, moment})
//     })
//     .catch(err => {
//         console.log(err)
//     })
// }


// // HTTP DELETE
// exports.pokegochi_delete_get = (req, res) => {
//     console.log(req.query.id);

//     pokegotchi.findByIdAndDelete(req.query.id)
//     .then(() => {
//         res.redirect("/pokegotchi/index");
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }

// // Edit API

// // HTTP GET - Load pokegotchi Edit Form
// exports.pokegochi_edit_get = (req, res) => {
//     pokegotchi.findById(req.query.id)
//     .then((pokegotchi) => {
//         res.render("pokegotchi/edit", {pokegotchi})
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }

// // HTTP PUT - pokegotchi Update
// exports.pokegochi_update_put = (req, res) => {
//     console.log(req.body.id);

//     pokegotchi.findByIdAndUpdate(req.body.id, req.body)
//     .then(() => {
//         res.redirect("/pokegotchi/index");
//     })
//     .catch(err => {
//         console.log(err)
//     })
// }


// GET Pokegotchi by User Id
exports.pokegotchi_byUserId_get = (req, res) => {
    Pokegotchi.find({user: req.query.id})

    .then(pokegotchi => {
        res.json({pokegotchi})
    })
    .catch(err => {
        console.log(err)
    })
}
