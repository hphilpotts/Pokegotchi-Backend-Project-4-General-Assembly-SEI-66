
const mongoose = require('mongoose');

const attackSchema = mongoose.Schema({

    // pokegotchi: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Pokegotchi'
    // }],
    name: String,
    Damage: Number,
}, 
{ timestamps: true}
);

const Attack = mongoose.model("Attack", attackSchema); // corrected spelling of PG

module.exports = Attack;