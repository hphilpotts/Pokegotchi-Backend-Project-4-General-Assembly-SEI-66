const mongoose = require('mongoose');

const pokegochiSchema = mongoose.Schema({
    name: String,
    hp: Number,
    age: Number,
    cleanLevel: Number,
    foodLevel: Number,
    playLevel: Number,


    trainer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainer'
    }],

    battle: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Battle'
    }]

}, 
{ timestamps: true}
);

const Pokegochi = mongoose.model("Pokegochi", pokegochiSchema);

module.exports = {Pokegochi};