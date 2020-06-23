const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoia2FpemVyc2VuanUiLCJhIjoiY2tibGtzdmlmMTZ5ejJ1cGZpeDJqajhmcSJ9.3J0nR14pmcyYP2eTYNgOwA`;

    request({ url, json: true}, (error, { body }) => {
        if ( error ) {
            callback('Unable to connect!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find search location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name,
                placeText: body.features[0].text,
            })
        }
    })
}
module.exports = geocode