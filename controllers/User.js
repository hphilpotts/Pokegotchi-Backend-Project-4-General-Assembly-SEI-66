
// const {Trainer} = require("../models/Trainer");
const {Pokegotchi} = require("../models/Pokegotchi");
const {User} = require("../models/")
const moment = require('moment');

// HTTP GET - Load Trainer From
exports.trainer_create_get = (req, res) => {
    res.render("trainer/add");
}

// HTTP POST - Trainer
exports.trainer_create_post = (req, res) => {

    let trainer = new Trainer(req.body);

    trainer.save()
    .then(() => {

        res.json({trainer});
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later!!!");
    })
}


// HTTP GET - Trainer Index API
exports.trainer_index_get = (req, res) => {
    Trainer.find().populate('pokegotchi')
    .then(trainers => {
        res.json({trainers: trainers})
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP GET - Trainer By Id
exports.trainer_show_get = (req, res) => {
    console.log(req.query.id);

    Trainer.findById(req.query.id).populate('pokegotchi')
    .then(trainer => {
        res.render("trainer/detail", {trainer, moment}) 
    })
    .catch(err => {
        console.log(err)
    })
}

// HTTP DELETE - Trainer
exports.trainer_delete_get = (req, res) => {
    console.log(req.query.id);

    Trainer.findByIdAndDelete(req.query.id)
    .then((trainer) => {
        res.json({trainer})
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP GET - Load Trainer Edit Form
exports.trainer_edit_get = (req, res) => {
    Trainer.findById(req.query.id)
    .then((trainer) => {
        res.json({trainer})
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP PUT - Trainer Update
exports.trainer_update_put = (req, res) => {
    console.log(req.body._id);

    Trainer.findByIdAndUpdate(req.body._id, req.body, {new: true})
    .then(() => {
        res.json({trainer})
    })
    .catch(err => {
        console.log(err)
    })
}