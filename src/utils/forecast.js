const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3b767e779d98ee911bca07521641b7a2&query=' + latitude + ',' + longitude + '&unit=f';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!')
        }
        else if (body.error) {
            callback('Unable to find the location!')
        }
        else {
            console.log(body);
            callback(undefined, `${body.current.weather_descriptions[0]} . It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}%`)
        }
    });
}

module.exports = forecast;