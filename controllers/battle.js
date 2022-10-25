// Require Mongoose Model
const Battle =  require("../models/Opponent")
// Require Model to grab existing HP and send altered HP
const Pokegotchi = require("../models/Pokegotchi")
//Require Model your saving into 
const Battle = require("../models/Battle");

// Require Axios, objectId to save into right battle object , to parse Pokegotchi Id to save Attack to
const axios = require('axios');
const ObjectId = require('mongoose').Types.ObjectId;
//

// HTTP GET - Load Opponent for Battle - find by generating random pokemon from 151 of APIv2: use to get name of Pokemon (perhaps attack names or Damage Amount (or write function to randomly assign damage amount of attacks)) Save Opponent model - and populate in correct battle ID // Call does not necessarily need get and post? could be one thing. Send to FE as JSON object. Send to FE as JSON object
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