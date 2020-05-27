const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url ="https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=metric&appid=1f24c9500f58869fa3514b20429e8c07"
    request({url,json:true},(error,{body})=>{
        if (error){
            callback('Unable to connect to weather service')
        } else if (body.cod === "404"){
            callback('Unable to find location')
        }else{
            callback(undefined,body)
        } 
    })
}

module.exports = forecast