const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);




//Setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jason Concepcion'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jason Concepcion'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, praesentium.',
        name: 'Jason Concepcion'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
       return res.send({
            error: 'Address Query String Needed'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location, placeText} = {}) => {
       if(error) {
           return res.send({
               error: error
           })
       }
       forecast(placeText, (error, forecastData) => {
           if(error) {
               return res.send({
                   error: error
               })
           }
           res.send({
               location,
               placeText,
               latitude,
               longitude,
               forecast: forecastData
           })
       })
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return  res.send({
            error: 'Must Provide Search Query'
        })
    }
   
    console.log(req.query.search); 
    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errMessage: 'Help Article Not Found',
        title: '404 Error',
        name: 'Jason Concepcion'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        errMessage: 'Page not Found',
        title: '404 Error',
        name: 'Jason Concepcion'
    })
});

app.listen(port, () => {
    console.log('Server is up on port: ' + port);
})