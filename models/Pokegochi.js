const mongoose = require('mongoose');

const pokegochiSchema = mongoose.Schema({
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

const Pokegochi = mongoose.model("Pokegochi", pokegochiSchema);

module.exports = {Pokegochi};