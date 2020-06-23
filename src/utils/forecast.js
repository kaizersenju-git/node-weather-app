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
                location: body.location.name + " " + body.location.country,
                localTime: body.location.localtime,
                timezone: body.location.timezone_id
             })
        }
    })
}

module.exports = forecast
