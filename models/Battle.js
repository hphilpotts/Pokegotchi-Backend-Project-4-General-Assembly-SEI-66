const mongoose = require('mongoose');

const battleSchema = mongoose.Schema({
    name: String,

    pokegochi: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pokegochi'
    }]

}, 
{ timestamps: true}
);

const Pokegochi = mongoose.model("Battle", BattleSchema);

module.exports = {Battle};