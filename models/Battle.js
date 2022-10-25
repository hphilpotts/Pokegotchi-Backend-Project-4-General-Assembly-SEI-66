const mongoose = require('mongoose');

const battleSchema = mongoose.Schema({
    
    outcome: Boolean,
    hp: Number,
    
    attacks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attacks'
    }],

    pokegotchi: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pokegotchi'
    }],
    //get HP from Pokegotchi and effect that way
    opponent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Opponent'
    }]

}, 
{ timestamps: true}
);

const Battle = mongoose.model("Battle", battleSchema); // corrected spelling of PG

module.exports = Battle;