const request = require('request');

request({
   method: 'GET',
   uri: 'https://pokeapi.co/api/v2/pokemon/',
}, function (error, response, body){
    if (error) {
        console.log(error);
        return;
    }
   const data = response.body;
   const apiData = JSON.parse(data)
   console.log('Returned: ', apiData)
   if(response.statusCode == 200){
     console.log('success');
   }
   else{
     console.log("error with api call")
   }
});