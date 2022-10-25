
const mongoose = require('mongoose');

const attackSchema = mongoose.Schema({

    Pokegotchi: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pokegotchi'
    }],

    name: String,
    Damage: Number,
}, 
{ timestamps: true}
);

const Pokegotchi = mongoose.model("Attack", attackSchema); // corrected spelling of PG

module.exports = {Pokegotchi};