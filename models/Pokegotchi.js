const mongoose = require('mongoose');

const pokegotchiSchema = mongoose.Schema({
    name: String,
    hp: Number,
    age: Number,
    cleanLevel: Number,
    foodLevel: Number,
    playLevel: Number,


    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    battle: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Battle'
    }]

}, 
{ timestamps: true}
);

const Pokegotchi = mongoose.model("Pokegotchi", pokegotchiSchema); // corrected spelling of PG

module.exports = {Pokegotchi};