const request = require('request')

const geoCodeFunc = (address, callback) =>{
    const geocodeUrl = 'http://www.mapquestapi.com/geocoding/v1/address?key=uA16z4P2MzJy3isxdkUa97Vf83hOCWhp&location='+ encodeURIComponent(address);
     request({url: geocodeUrl, json:true}, (error, response) => {
         if(error){
             callback('Not able to fetch the location details..!', undefined)
         }else if (!response.body){
             callback('Location not available..Try another search!', undefined)
         }else{
             callback(undefined, {
                 latitude: response.body.results[0].locations[0].latLng.lat,
                 longitude: response.body.results[0].locations[0].latLng.lng,
                 location: response.body.results[0].locations[0].adminArea5
 
             })
         }
     })
 }

 module.exports = geoCodeFunc