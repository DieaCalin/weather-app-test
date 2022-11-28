const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const { Console } = require('console');
const weather = require('./utils/weather')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPaths = path.join(__dirname, '../templates/views');

const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPaths);
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Calin"
    })
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Page',
        name: "Calin"
    });
});

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        name: "Calin"
    })
})

app.get('', (req, res) => {
    res.send('./page.html')
})

app.get('/weather', (req,res) => {
    if(!req.query.location) {
        return res.send({
               error: "Provide a location"
        })
    } else {
        weather(req.query.location, (error, {temperature, windspeed} = {}) => {
            if(error){
                console.log(error)
            }
            if(temperature){
                res.send({
                    location: req.query.location,
                    temperature: temperature,
                    windspeed: windspeed
                })
            }
        })
    }
})

app.get('/products', (req,res) => {
    console.log(req.query)
    if(!req.query.search) {
        return res.send({
            error: 'Provide search term!'
        })
    }
    res.send({
        products: []
    })
})


app.get('/help/*', (req,res) => {
    res.render('404', {
        error: "Help page not found"
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        error: 'Page not found'
    })
})

app.get('/about', (req,res) => {
    res.send({
        name: "Calin",
        age: "23"
    })
})

app.listen(port, () => {
    console.log("Server is UP on port " + port)
})