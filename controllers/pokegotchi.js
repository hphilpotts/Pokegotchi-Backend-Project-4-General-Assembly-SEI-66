const Pokegotchi = require("../models/Pokegotchi");
const axios = require('axios');
const Attack = require("../models/Attack")
const ObjectId = require('mongoose').Types.ObjectId

// const moment = require('moment');

// HTTP GET - load Pokegotchi - currently randomly generates // FE will end up getting the User input, then send to BE, then BE will save into DB,
// Apply isLoggedin to this route, associate pokegotchi with signed in user 
exports.user_pokegotchi_load = (req, res) => {
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
      };

    let randomisedPokeId = getRandomIntInclusive(1,151);
    pokeId = randomisedPokeId.toString()
    // console.log(randomisedPokeId)
    //  when merge with Dan will need to send ID Number of Pokemon to BE
    // let currentPokegotchiId; current pokeobj outside did not work
    let attackArr = [];
    // let newPokeObjId = "";
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}/`)
    .then((response) => {
        let pokegotchiFeatures = response.data
        let movesArr = pokegotchiFeatures.moves.slice(0, 5)
        // console.log(movesArr[0].move.name) working to only access move name
        movesArr.forEach(move => {
            let moveName = move.move.name
            attackArr.push(moveName)
            return attackArr
        })
        let newPokegotchi = new Pokegotchi({
        name: pokegotchiFeatures.name,
        pokedex: pokegotchiFeatures.id,
        hp: 10,
        age: 0,
        cleanLevel: 10,
        foodLevel: 10,
        playLevel: 10,
        }); 
        //saving newly created Pokegotchi
        newPokegotchi.save()
        console.log(newPokegotchi)
        // let attackObjArr;
        //create attack model and adding to attacks field
        attackArr.forEach((attack) => {
            let newAttack = new Attack({
                    name: attack,
                    Damage: 3
            });   
            newPokegotchi.attacks.push(newAttack)
        })
        console.log(newPokegotchi.attacks)
    // Add attack Save here 
                // Pokegotchi.findOne({}, {}, { sort: { 'createdAt' : -1 } }, function(err, pokegotchiDoc) {
                //     //  console.log(pokegotchiDoc._id);
                //     return newPokeObjId = pokegotchiDoc._id
                // });
                // console.log(newPokeObjId)
                
                // let idStart = newPokeObjId.indexOf('(')
                // let idEnd = newPokeObjId.indexOf(')')
                // let finalId = newPokeObjId.splice(idStart, idEnd)
                // console.log(finalId)
            // attackArr.forEach((attack) => {
            //     let newAttack = new Attack({
            //         pokegotchi: 
            //         name: attack,
            //         Damage: 3
        
    })
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
exports.pokegotchi_index_get = (req, res) => {
    Pokegotchi.find()
    .then(pokegotchi => {
        res.json({pokegotchi})
    })
    .catch(err => {
        console.log(err)
    })
}



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

// PUT PokeGotchi Update Field API: 

    // * NB: takes three Query params:
        // id = user id, finds Pokegotchi on this basis
        // field = field name to update (cleanLevel || foodLevel || playLevel || hp)
        // value = value to update with
        // http://localhost:3000/pokegotchi/update?id=<userId>&field=<fieldToUpdate>&value=<valueToUpdateWith>
        // e.g.: Axios.put(http://localhost:3000/pokegotchi/update?id=635a6107cf5cb5becdc765f7&field=hp&value=100)

exports.pokegotchi_update_put = (req, res) => {
    const filter = { user: req.query.id };
    // console.log(filter);
    const field = req.query.field;
    // console.log(field);
    const update = { [field]: req.query.value }
    // console.log(update);
    Pokegotchi.findOneAndUpdate(filter, update, {
        new: true
    })
    .then(pokegotchi => {
        pokegotchi.save()
        console.log('updated')
        res.json({pokegotchi})
    })
    .catch(err => {
        console.log(err)
    })
}
