const request = require('request');

const forecast = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=76632f23d4cf5491eebfd8634c76d6ae&query=${address}`;
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect', undefined);
        } else if (body.error) {
            callback('Forecast not found', undefined);
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                summary: body.current.weather_descriptions[0],
                rainChance: body.current.precip * 100 + "%",
                location: body.location.name + " " + body.location.country
             })
        }
    })
}

module.exports = forecast


//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

