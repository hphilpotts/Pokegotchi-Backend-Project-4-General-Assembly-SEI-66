const {Pokegotchi} = require("../models/Pokegotchi");
const {Trainer} = require("../models/Trainer");
const axios = require('axios');
const ObjectId = require('mongoose').Types.ObjectId;

// const moment = require('moment');

// HTTP GET - Load pokegotchi From
// ! don't believe we'll need to iterate through all 151 as user
// ! will select the pokemon of their choice and we then just get that data?
axios.get('https://pokeapi.glitch.me/v1/pokemon/1/')
    .then((response) => {
        console.log(response.data[0].name);
        console.log(response.data[0].species);
        console.log(response.data[0].sprite);
    })
    .catch(error => {
        console.log(error);
    });
    

// HTTP POST - pokegotchi
exports.pokegochi_create_post = (req, res) => {

    let pokegotchi = new pokegotchi(req.body);

    pokegotchi.save()
    .then(() => {

        // M2MR
        req.body.trainer.forEach(trainer => {
            Trainer.findById(trainer, (error, trainer) => {
                trainer.pokegotchi.push(pokegotchi);
                trainer.save();
            })
        });
        res.redirect("/pokegotchi/index");
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later!!!");
    })
}


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



// HTTP GET - pokegotchi By Id
exports.pokegochi_show_get = (req, res) => {
    console.log(req.query.id);

    // Find the pokegotchi by ID
    pokegotchi.findById(req.query.id).populate('trainer')
    .then(pokegotchi => {
        res.render("pokegotchi/detail", {pokegotchi, moment})
    })
    .catch(err => {
        console.log(err)
    })
}


// HTTP DELETE
exports.pokegochi_delete_get = (req, res) => {
    console.log(req.query.id);

    pokegotchi.findByIdAndDelete(req.query.id)
    .then(() => {
        res.redirect("/pokegotchi/index");
    })
    .catch(err => {
        console.log(err);
    })
}

// Edit API

// HTTP GET - Load pokegotchi Edit Form
exports.pokegochi_edit_get = (req, res) => {
    pokegotchi.findById(req.query.id)
    .then((pokegotchi) => {
        res.render("pokegotchi/edit", {pokegotchi})
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP PUT - pokegotchi Update
exports.pokegochi_update_put = (req, res) => {
    console.log(req.body.id);

    pokegotchi.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
        res.redirect("/pokegotchi/index");
    })
    .catch(err => {
        console.log(err)
    })
}



// GET Pokegotchi by User Id
    // * not yet tested, may also duplicate functionality from above?
exports.pokegotchi_byUserId_get = (req, res) => {
    console.log("passed in: " + req.query.id)
    // Pokegotchi.find({ name: req.query.id}) // * works in postman when key:id value:Testmon is passed in as Query Param
    Pokegotchi.find({ User: req.query.id }) // ! ...does not work any which way.
        // ? I think the issue is possibly because I manually created a pokegotchi?
        // TODO : test once create pokegotchi funcitonality works
        // ? if not:
        // TODO : find an alternative way of searching

    .then(pokegotchi => {
        console.log(pokegotchi)
        res.json({pokegotchi})
    })
    .catch(err => {
        console.log(err)
    })
}