const mongoose = require('mongoose');

const battleSchema = mongoose.Schema({
    name: String,
    hp: Number,
    age: Number,
    cleanLevel: Number,
    foodLevel: Number,
    playLevel: Number,


    pokegotchi: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pokegotchi'
    }]

}, 
{ timestamps: true}
);

const Pokegochi = mongoose.model("Battle", BattleSchema);

module.exports = {Battle};