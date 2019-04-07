const request = require('request')

const locationDetails = (lat, lng, callback) => {
    const url='https://api.darksky.net/forecast/3a7413b5c4ffae4be937c082cabdbd46/'+encodeURIComponent(lat)+','+encodeURIComponent(lng)+'?units=si'
    request({url:url, json:true}, (error, response) =>{
        //const data = JSON.parse(response.body)
        if(error){
            callback('Not able to fetch the location details..!', undefined)
        }else if (response.body.error){
            callback('Unable to find the location..!', undefined)
        }else{
            callback(undefined,'The current temperature is : '+response.body.currently.temperature +' degree and there is '+response.body.currently.precipProbability+'% chance for rain')
        }
    })

}

module.exports = locationDetails