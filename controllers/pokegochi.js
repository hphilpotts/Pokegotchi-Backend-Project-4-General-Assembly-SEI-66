const {Pokegochi} = require("../models/Pokegochi");
const {Trainer} = require("../models/Trainer");
const axios = require('axios');

// const moment = require('moment');

// HTTP GET - Load Pokegochi From
// ! don't believe we'll need to iterate through all 151 as user will select the pokemon of their choice and we then just get that data?
axios.get('https://pokeapi.glitch.me/v1/pokemon/1/')
    .then((response) => {
        console.log(response.data[0].name);
        console.log(response.data[0].species);
        console.log(response.data[0].sprite);
    })
    .catch(error => {
        console.log(error);
    });
    

// HTTP POST - Pokegochi
exports.pokegochi_create_post = (req, res) => {

    let pokegochi = new Pokegochi(req.body);

    pokegochi.save()
    .then(() => {

        // M2MR
        req.body.trainer.forEach(trainer => {
            Trainer.findById(trainer, (error, trainer) => {
                trainer.pokegochi.push(pokegochi);
                trainer.save();
            })
        });
        res.redirect("/pokegochi/index");
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later!!!");
    })
}


// HTTP GET - Pokegochi Index API
exports.pokegochi_index_get = (req, res) => {
    Pokegochi.find().populate('trainer')
    .then(pokegochis => {
        res.render("pokegochi/index", {pokegochis: pokegochis, moment})
    })
    .catch(err => {
        console.log(err);
    })
}



// HTTP GET - Pokegochi By Id
exports.pokegochi_show_get = (req, res) => {
    console.log(req.query.id);

    // Find the pokegochi by ID
    Pokegochi.findById(req.query.id).populate('trainer')
    .then(pokegochi => {
        res.render("pokegochi/detail", {pokegochi, moment})
    })
    .catch(err => {
        console.log(err)
    })
}


// HTTP DELETE
exports.pokegochi_delete_get = (req, res) => {
    console.log(req.query.id);

    Pokegochi.findByIdAndDelete(req.query.id)
    .then(() => {
        res.redirect("/pokegochi/index");
    })
    .catch(err => {
        console.log(err);
    })
}

// Edit API

// HTTP GET - Load Pokegochi Edit Form
exports.pokegochi_edit_get = (req, res) => {
    Pokegochi.findById(req.query.id)
    .then((pokegochi) => {
        res.render("pokegochi/edit", {pokegochi})
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP PUT - Pokegochi Update
exports.pokegochi_update_put = (req, res) => {
    console.log(req.body.id);

    Pokegochi.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
        res.redirect("/pokegochi/index");
    })
    .catch(err => {
        console.log(err)
    })
}



