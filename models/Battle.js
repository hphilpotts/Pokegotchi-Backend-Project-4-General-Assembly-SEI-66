const mongoose = require('mongoose');

const battleSchema = mongoose.Schema({
    name: String,
    hp: Number,
    age: Number,
    cleanLevel: Number,
    foodLevel: Number,
    playLevel: Number,


    pokegochi: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pokegochi'
    }]

}, 
{ timestamps: true}
);

const Pokegochi = mongoose.model("Battle", BattleSchema);

module.exports = {Battle};