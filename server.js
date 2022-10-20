const express = require('express');

const app = express();

const PORT = 4000;

app.listen(PORT, function() {
    console.log("Pokegochi");
})

app.get('/', function(req, res){
    res.send("Pokegochi");
})