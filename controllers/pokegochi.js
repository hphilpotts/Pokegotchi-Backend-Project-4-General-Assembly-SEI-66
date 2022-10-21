const {Pokegochi} = require("../models/Pokegochi");
const {Trainer} = require("../models/Trainer");

const moment = require('moment');

// HTTP GET - Load Pokegochi From
// exports.pokegochi_create_get = (req, res) => {

//     Trainer.find()
//     .then((trainers) => {
//         res.render("pokegochi/add", {trainers})
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// }

// HTTP GET - Load Pokegochi From
exports.pokegochi_create_get = (req, res) => {


        User.find = () => {
            const promises = [];
            for (let i = 1; i <= 150; i++) {
                const url = `https://pokeapi.glitch.me/v1/pokemon/${i}`;
                promises.push(fetch(url).then((res) => res.json()));
            }
            Promise.all(promises).then((results) => {
                const pokemon = results.map((result) => ({
                    name: result.name,
                    species: result.species,
                    image: result.sprite,
                    type: result.types.map((type) => type.type.name).join(', '),
                    id: result.id
                }));
                displayPokemon(pokemon);
                console.log(pokemon)
            });
        };
    }





// HTTP POST - Pokegochi
exports.pokegochi_create_post = (req, res) => {

    let pokegochi = new Pokegochi(req.body);

    pokegochi.save()
    .then(() => {

        // M2MR
        req.body.trainer.forEach(trainer => {
            Trainer.findById(trainer, (error, trainer) => {
                trainer.pokegochi.push(pokegochi);
                trainer.save();
            })
        });
        res.redirect("/pokegochi/index");
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later!!!");
    })
}


// HTTP GET - Pokegochi Index API
exports.pokegochi_index_get = (req, res) => {
    Pokegochi.find().populate('trainer')
    .then(pokegochis => {
        res.render("pokegochi/index", {pokegochis: pokegochis, moment})
    })
    .catch(err => {
        console.log(err);
    })
}






// HTTP GET - Pokegochi By Id
exports.pokegochi_show_get = (req, res) => {
    console.log(req.query.id);

    // Find the pokegochi by ID
    Pokegochi.findById(req.query.id).populate('trainer')
    .then(pokegochi => {
        res.render("pokegochi/detail", {pokegochi, moment})
    })
    .catch(err => {
        console.log(err)
    })
}


// HTTP DELETE
exports.pokegochi_delete_get = (req, res) => {
    console.log(req.query.id);

    Pokegochi.findByIdAndDelete(req.query.id)
    .then(() => {
        res.redirect("/pokegochi/index");
    })
    .catch(err => {
        console.log(err);
    })
}

// Edit API

// HTTP GET - Load Pokegochi Edit Form
exports.pokegochi_edit_get = (req, res) => {
    Pokegochi.findById(req.query.id)
    .then((pokegochi) => {
        res.render("pokegochi/edit", {pokegochi})
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP PUT - Pokegochi Update
exports.pokegochi_update_put = (req, res) => {
    console.log(req.body.id);

    Pokegochi.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
        res.redirect("/pokegochi/index");
    })
    .catch(err => {
        console.log(err)
    })
}



// ! CALLING ALL ORIGIN 151 POKEMON + ITERATING OVER THEM
  
// function fetchKantoPokemon(){
//     fetch('https://pokeapi.co/api/v2/pokemon?limit=151')  
//      .then(response => response.json())
//      .then(function(allpokemon){
//      allpokemon.results.forEach(function(pokemon){
//        fetchPokemonData(pokemon); 
//      })
//     })
//    }


// ! OR USE V1 
// const fetchKantoPokemon = () => {
//     for (let i = 1; i <= 150; i++) {
//         const url = `https://pokeapi.glitch.me/v1/pokemon/${i}`;
//     }
// }



   //FETCHES INDIVIDUAL POKEMON DATE FROM ABOVE.
//    function fetchPokemonData(pokemon){
//     let url = pokemon.url // saves pokemon to a url (Ex: https://pokeapi.co/api/v2/pokemon/1/)
//       fetch(url)
//       .then(response => response.json())
//       .then(function(pokeData){
//       console.log(pokeData)
//       })
//     }

    // EXTRACTS DATA FROM POKEDATA AND RENDERS AS HTML 
    // // ! NEED TO PASS AS JSON?
    // function renderPokemon(pokeData){
    //     let allPokemonContainer = document.getElementById('poke-container');
    //     let pokeContainer = document.createElement("div") //div will be used to hold the data/details for indiviual pokemon.{}
    //     let pokeName = document.createElement('h4')
    //     pokeName.innerText = pokeData.name
    //     let pokeNumber = document.createElement('p')
    //     pokeNumber.innerText = `#${pokeData.id}`
    //     let pokeTypes = document.createElement('ul') 
    //     //ul list will hold the pokemon types
    //     createTypes(pokeData.types, pokeTypes) 
    //     // helper function to go through the types array and create li tags for each one
    //     pokeContainer.append(pokeName, pokeNumber, pokeTypes);   
    //     //appending all details to the pokeContainer div
    //     allPokemonContainer.appendChild(pokeContainer);       
    //     //appending that pokeContainer div to the main div which will                                                             hold all the pokemon cards
    //     }

    // APPENDS DATA TO LIST
    // function createTypes(types, ul){
    //     types.forEach(function(type){
    //     let typeLi = document.createElement('li');
    //     typeLi.innerText = type['type']['name'];
    //     ul.append(typeLi)
    //         })
    //     }

    // TO PROVIDE BETTER IMAGE OF POKEMON FROM POKEMON API VERSION 1 
        // function createPokeImage(pokeID, containerDiv){
        //     let pokeImage = document.createElement('img')
        //     pokeImage.srcset =    `https://cdn.traction.one/pokedex/pokemon/${pokeID}.png`
        //     containerDiv.append(pokeImage);
        //   }
        
