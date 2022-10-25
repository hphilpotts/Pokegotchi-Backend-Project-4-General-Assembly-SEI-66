const mongoose = require('mongoose');

const opponentSchema = mongoose.Schema({

    name: String,
    attack: String,
    damagePower: Number, 

    battle: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Battle'
    }]

}, 
{ timestamps: true}
);

const Opponent = mongoose.model("Opponent", opponentSchema); // corrected spelling of PG

module.exports = Opponent;