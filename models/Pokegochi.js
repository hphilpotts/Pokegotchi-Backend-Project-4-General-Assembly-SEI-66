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
    }]

}, 
{ timestamps: true}
);

const Pokegochi = mongoose.model("Pokegochi", pokegochiSchema);

module.exports = {Article};