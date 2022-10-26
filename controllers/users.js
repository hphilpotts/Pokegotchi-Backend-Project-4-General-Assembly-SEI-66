const  User = require('../models/User');

const mongoose = require('mongoose')

// -- CREATE:

    // N/A for user controller: see auth.js!

// -- READ:

// HTTP GET - Index of Users:
exports.user_index_get = (req, res) => {
    User.find()
    .then(users => {
        res.json({users});
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP GET - User Detail by Id:
exports.user_detail_get = (req, res) => {
    console.log('finding user...');
    console.log(req.query.id)
    console.log(typeof req.query.id)
    console.log(mongoose.Types.ObjectId.isValid(req.query.id))
    User.findById(req.query.id)
    .then(user => {
        res.json({user});
    })
    .catch(err => {
        console.log(err);
    })
}

// -- UPDATE:

// HTTP GET - Get Edit User Page by Id:
exports.user_edit_get = (req, res) => {
    User.findById(req.query.id)
    .then(user => {
        res.json({user});
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP PUT - Edit User and Updated:
exports.user_edit_put = (req, res) => {
    User.findByIdAndUpdate(req.body._id, req.body, {new: true})
    .then(user => {
        res.json({user});
    })
    .catch(err => {
        console.log(err);
    })   
}

// -- DELETE:

// HTTP DELETE - Delete User by Id:
exports.user_delete = (req, res) => {
    User.findByIdAndDelete(req.query.id).populate('pokegotchi')
    .then(user => {
        res.json({user});
    })
    .catch(err => {
        console.log(err);
    })
}