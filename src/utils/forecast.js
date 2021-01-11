const request = require('request');

const forecast =(lat,lon,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=ef820584c70a7a0e896ee624560c132a&query='+encodeURIComponent(lat)+','+encodeURIComponent(lon);

    request({url:url,json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to weather service',undefined);
        } else if(body.error){
            callback('Unable to find Location.',undefined);
        } else{
            callback(undefined,"It is currently " +body.current.temperature+ ". It is feels like"+body.current.feelslike+", and humidity is "+body.current.humidity);
        }
    })
}

module.exports = forecast;