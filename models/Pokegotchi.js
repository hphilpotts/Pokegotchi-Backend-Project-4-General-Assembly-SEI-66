const mongoose = require('mongoose');

const pokegotchiSchema = mongoose.Schema({
    name: String,
    pokedex: Number, // used for card image, useful for cross-api calls if we need
    hp: Number,
    age: Number,
    cleanLevel: Number,
    foodLevel: Number,
    playLevel: Number,
    // ? could/should we add element at a later date to allow for responsive themeing?

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

const Pokegotchi = mongoose.model("Pokegotchi", pokegotchiSchema); // corrected spelling of PG

module.exports = {Pokegotchi};

// ! manual insert into DB example:

// {
//   "_id": {
//     "$oid": "635677bef317ed79fc3df496"
//   },
//   "name": "Ivysaur",
//   "pokedex": 2,
//   "age": 5,
//   "cleanLevel": 10,
//   "foodLevel": 0,
//   "playLevel": 5,  
//   "user": "63565a70bc2e27a43a0444f2"
// }