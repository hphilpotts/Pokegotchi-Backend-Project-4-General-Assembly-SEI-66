// Require Mongoose Model
const Attack =  require("../models/Attack")
// require Model your saving into
const Pokegotchi = require("../models/Pokegotchi")
// Require Axios, objectId to search for attacks based on pokemon name, to parse Pokegotchi Id to save Attack to
const axios = require('axios');
const ObjectId = require('mongoose').Types.ObjectId;
//

// HTTP GET - Load Attacks of Pokemon - find by grabbing PokegotchiObject's name (from Id) and using API get attack name/damage amount - HTTP POST then save Attack into Attacks of PokegotchiObject. // Call does not necessarily need get and post? could be one thing. Send to FE as JSON object
// 

//Load Attacks
// axios.get('https://pokeapi.glitch.me/v1/pokemon/1/')
//     .then((response) => {
//         console.log(response.data[0].name);
//         console.log(response.data[0].species);
//         console.log(response.data[0].sprite);
//     })
//     .catch(error => {
//         console.log(error);
//     });
    
//Save Attacks into Pokegotchi